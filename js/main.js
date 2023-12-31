swiperEl = document.querySelector('.slider-banner-content')




advantEl = document.querySelector('.advant-slider')

const paramsAdvant = {
  shouldPreventDefault: true,
  navigation: {
    prevEl: '#prevAdvant',
    nextEl: '#nextAdvant'
  },
  slideToClickedSlide: true,
  breakpoints: {
    0: {
      spaceBetween: 16,
      slidesPerView: 'auto'
    },
    484: {
      spaceBetween: 24,
      slidesPerView: 'auto'
    },
    1280: {
      spaceBetween: 36,
      slidesPerView: 'auto'
    }
  }
}

Object.assign(advantEl, paramsAdvant)
advantEl.initialize()


const workSlider = new Swiper('.work-slider', {
  slidesPerView: 1,
  effect: 'fade',
  fadeEffect: { crossFade: true },
  autoplay: {
      delay: 5000,
      disableOnInteraction: false
  },
  pagination: {
      el: '.work-pagination',
      renderBullet: (index, className) => {
          index = index + 1;
          return '<span class="' + className + '"><span class="stage">' + index + ' этап</span></span>'
      },
      clickable: true
  }
})

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-head')
  tabs.forEach((el) => {
    el.addEventListener('click', () => {
      tabs.forEach((tab) => {
        tab.classList.remove('active')
      })
      el.classList.add('active')
      const content = document.querySelectorAll('.tab-content')
      content.forEach((con) => {
        con.classList.remove('active')
      })
      content[el.getAttribute('data-id')].classList.add('active') 
    })
  })
})

document.addEventListener('DOMContentLoaded', () => {
  const stage = document.querySelectorAll('.work-section')
  let activeIndex = 1
  const stageLength = stage.length 
  setInterval(() => {
    stage[activeIndex % stageLength].classList.add('active')
    stage[(activeIndex - 1) % stageLength].classList.remove('active')
    activeIndex++
  }, 5000)
})

function toggleAccordeon(el) {
  el.classList.toggle('active')
  var panel = el.querySelector('.accordeon-subject')
  if (panel.style.maxHeight) {
    panel.style.maxHeight = null
  } else {
    panel.style.maxHeight = panel.scrollHeight + 'px'
  }
}

var files = []
document.addEventListener('DOMContentLoaded', () => {
    $('#file').on('change', function (event) {
        event.preventDefault();
        event.stopPropagation();
          for (let file of event.target.files) {
              if (notDuplicate(files, file)) {
                  files.push(file)
              }
          }
        
        data = new DataTransfer()
        for (let file of files) {
            data.items.add(file)
        }
        event.target.files = data.files
        updateFiles()
    });
})

function removeFileFromFileList(index) {
    files.splice(index, 1)
    data = new DataTransfer()
    for (let file of files) {
        data.items.add(file)
    }
    document.getElementById('file').files = data.files
    updateFiles()
}
 
function updateFiles() {
  fileArray = document.querySelector('#file').files
  filelist = '<div class="selected-files">'
  document.querySelector('.count-error').style.display = 'none'
  document.querySelector('.size-error').style.display = 'none'
  fileSizeLimit = 20971520
  cumulativeFileSize = 0
  Array.from(fileArray).forEach((file, index) => {
    cumulativeFileSize += file.size
    filename = file.name.length > 21 ? file.name.substr(0, 21) + '...' : file.name
    if (cumulativeFileSize > fileSizeLimit) {
      if (file.size > fileSizeLimit) {
        filelist += `<span class="selected-file error">${filename}<img class="remove-file" data-id="${index}" src="./images/filecross.svg"></span>`
      } else {
        filelist += `<span class="selected-file">${filename}<img class="remove-file" data-id="${index}" src="./images/filecross.svg"></span>`
      }
      fileSizeError()
    } else {
      filelist += `<span class="selected-file">${filename}<img class="remove-file" data-id="${index}" src="./images/filecross.svg"></span>`
    }
    if (index > 9) {
      fileLimitError()
    }
  })
  document.querySelector('.file-desc').innerHTML = filelist + '</div>'
  
  document.querySelectorAll('.remove-file').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault()
      removeFileFromFileList(Number(el.getAttribute('data-id')))
      updateFiles()
    })
  })

  var select_null = document.querySelector('.selected-files')
  if (select_null.innerHTML == '') {
    select_null.style.height = "auto"
    select_null.style.padding = "0px"
    select_null.style.overflow = "auto"
    select_null.innerHTML = '<span class="file-hint">Прикрепить файлы</span><span class="file-hint-desc">Загружаемые файлы не должны превышать 20 мб</span>'
  }
}

function fileLimitError() {
  document.querySelector('.count-error').style.display = 'block'
}
function fileSizeError() {
  document.querySelector('.size-error').style.display = 'block'
}

document.querySelector('#file').addEventListener('change', updateFiles)


document.querySelector('.menu-trigger').addEventListener('click', () => {
  const wrapper = document.querySelector('.slide-menu-wrapper')
  wrapper.classList.toggle('active')
  if (wrapper.classList.contains('active')) {
    document.querySelector('.menu-trigger img').setAttribute('src', 'images/big_cross.svg')
  } else {
    document.querySelector('.menu-trigger img').setAttribute('src', 'images/burger.svg')
  }
})

document.querySelector('.slide-menu .menu-items').addEventListener('click', () => {
  document.querySelector('.slide-menu-wrapper').classList.remove('active')
  document.querySelector('.menu-trigger img').setAttribute('src', 'images/burger.svg')
})

document.querySelector('.main-nav.mobile .logo').addEventListener('click', () => {
  document.querySelector('.slide-menu-wrapper').classList.remove('active')
  document.querySelector('.menu-trigger img').setAttribute('src', 'images/burger.svg')
})

document.querySelector('.slide-menu-wrapper .header-button').addEventListener('click', () => {
  document.querySelector('.slide-menu-wrapper').classList.toggle('active')
  document.querySelector('.menu-trigger img').setAttribute('src', 'images/burger.svg')
})

document.querySelectorAll('.close-popup').forEach((el) => {
  el.addEventListener('click', () => {
    document.querySelector('.sendmail-popup-wrapper').classList.add('hidden')
    document.querySelector('.offer-request-wrapper').classList.add('hidden')
    document.getElementById('request-offer').reset()
    document.querySelector('#contacts-request').style.outline = 'none'
    document.querySelector('.offer-error-contacts').innerHTML = ''
    document.querySelectorAll('.offer-error-contacts').forEach((it) => { it.innerHTML = '&nbsp'})
    document.querySelectorAll('.offer-error-name').forEach((it) => { it.innerHTML = '&nbsp'})
    document.querySelectorAll('input').forEach((it) => { it.classList.remove('error') })
  })
})

function openRequest(el) {
  document.querySelector('.offer-request-wrapper').classList.remove('hidden')
}
document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('resize', function(event) {
    let arrNav = document.querySelector('#prevAdvant');
    if (arrNav.classList.contains('swiper-button-lock')) {
      arrNav.nextElementSibling.style.display = "none";
    } else {
      arrNav.nextElementSibling.style.display = "block";
    }
  }, true)
})

document.querySelectorAll('.coop-button').forEach((el) => {
  el.addEventListener('click', () => {
    document.querySelectorAll('input:not(#contractor-email, input[type="submit"]), textarea').forEach((item) => {
      item.value = '';
      item.checked = false;
      item.style.border = "none"
      if (item.parentElement.children[1].classList.contains('form-error')) {
        item.parentElement.children[1].style.display = "none"
      }
    })
    files = [];
    updateFiles();
  })
})