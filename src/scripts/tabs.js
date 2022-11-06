const rightAnswer = (() => {
    let count = 0

    function increment() {
        count += 1;
    }

    function getCount() {
        return count
    }

    function reset() {
        count = 0
    }

    return {
        increment,
        getCount,
        reset
    }
})()

function getAllTabs() {
    const tabs = document.querySelectorAll('.tab')

    return tabs
}

function setHandlers(tabs) {
    for (let tab of tabs) {
        const isSetEvHandler = tab.getAttribute('data-tab-set-ev-handler')
        if (isSetEvHandler) {
            const answersContainer = tab.querySelector('.test-tab__container')
            answersContainer.addEventListener('click', onClickAnswersHandler)
        }
    }
}

function onClickAnswersHandler(e) {
    const { target } = e
    if(target.classList.contains('test-tab__answer')) {
        const innerDot = target.querySelector('.test-tab__answer-dot-inner')
        innerDot.classList.add('test-tab__answer-dot-inner_active')

        const isRightAnswer = target.getAttribute('data-right-answer')
        if(isRightAnswer) {
            rightAnswer.increment()

            setTimeout(() => {
                setResText()
            }, 0)
        }

        delayBeforeNextTab()
    }
}
function setResText() {
    const text = `
     Вы правильно ответили на
     ${rightAnswer.getCount()} из 12 вопросов.
     Этот тест показывает то, на сколько у вас развита логика и смекалка, 
     а также показывает уровень информации которой вы обладаете. 
     Но помните что нет предела совершенству, 
     поэтому не стоит останавливаться на достигнутом.
`
    setResText.textEl.innerHTML = text
}

function delayBeforeNextTab(delay = 400) {
    setTimeout(() => {
        goNextTab()
    },  delay)
}

function goNextTab() {
    const currentTab = document.querySelector('.tab_current')
    const nextTabData = currentTab.getAttribute('data-tab-slug-next')

    let nextTab = undefined
    for(let tab of goNextTab.tabs) {
        const dataTabAttr = tab.getAttribute('data-tab-slug')
        if(dataTabAttr === nextTabData) {
            nextTab = tab
            break
        }
    }
    if(!nextTab) throw new Error(`${nextTabData}:next tab not found`)

    currentTab.classList.remove('tab_current')
    nextTab.classList.add('tab_current')
}

function startTestButton() {
    const btn = document.querySelector('.start-test-tab__btn-start')

    btn.addEventListener('click', () => {
      delayBeforeNextTab(200)
    })
}
function repeatTestButton() {
    const btn = document.querySelector('.result-tab__btn-repeat')

    btn.addEventListener('click', () => {
        location.reload()
    })
}

function main() {
    const tabs = getAllTabs()
    const resTabTextEl = document.querySelector('.result-tab__text')

    goNextTab.tabs = tabs
    setResText.textEl = resTabTextEl

    if (!tabs && tabs.length <= 0) throw new Error('tabs is empty')
    setHandlers(tabs)

    startTestButton()
    repeatTestButton()

    delayBeforeNextTab(1500)
}


main()
