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

function toggleAccordeon(el) {
  el.classList.toggle('active')
  var panel = el.querySelector('.accordeon-subject')
  if (panel.style.maxHeight) {
    panel.style.maxHeight = null
  } else {
    panel.style.maxHeight = panel.scrollHeight + 'px'
  }
}

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

function updateFiles() {
  filelist = '<div class="selected-files">'
  Array.from(document.querySelector('#file').files).forEach((file, index) => {
    filename = file.name > 21 ? file.name.substr(0, 21) : file.name
    filelist += `<span class="selected-file">${filename}<img class="remove-file" data-id="${index}" src="./images/filecross.svg"></span>`
  })
  document.querySelector('.file-desc').innerHTML = filelist + '</div>'
  
  document.querySelectorAll('.remove-file').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault()
      removeFileFromFileList(Number(el.getAttribute('data-id')))
    })
  })
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


function removeFileFromFileList(index) {
  const dt = new DataTransfer()
  const input = document.querySelector('#file')
  const { files } = input
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    if (index !== i)
      dt.items.add(file)
  }
  
  updateFiles()
  input.files = dt.files
}

document.querySelectorAll('.close-popup').forEach((el) => {
  el.addEventListener('click', () => {
    document.getElementById('request-offer').reset()
    document.getElementById('contacts-request').style.border = "none"
    document.querySelectorAll('.offer-error-contacts').forEach((it) => { it.innerHTML = '&nbsp'})
    document.querySelectorAll('.offer-error-name').forEach((it) => { it.innerHTML = '&nbsp'})
    document.querySelectorAll('input').forEach((it) => { it.classList.remove('error') })
    document.querySelector('.sendmail-popup-wrapper').classList.add('hidden')
    document.querySelector('.offer-request-wrapper').classList.add('hidden')
  })
})

function openRequest(el) {
  document.querySelector('.offer-request-wrapper').classList.remove('hidden')
}