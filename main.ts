namespace SpriteKind {
    export const Prop = SpriteKind.create()
}

let inputImgs: Image[] = [
    assets.image`A`,
    assets.image`B`,
    assets.image`Up`,
    assets.image`Down`,
    assets.image`Left`,
    assets.image`Right`
]

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.A.isPressed())
        addAndCheckPlayerInput(0)
})

controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.B.isPressed())
	    addAndCheckPlayerInput(1)
})

controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.up.isPressed())
	    addAndCheckPlayerInput(2)
})

controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.down.isPressed())
	    addAndCheckPlayerInput(3)
})

controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.left.isPressed())
	addAndCheckPlayerInput(4)
})

controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.right.isPressed())
	    addAndCheckPlayerInput(5)
})

function displayText(text: string, color: number = 0) {
    gameText.setText(text)
    gameText.setOutline(1, color)
    gameText.setPosition(80, 30)
}

function addAndCheckPlayerInput (inputType: number) {
	if (playerTurn == true) {
        playerTurn = false
        let correctInput = sequence[currentSequenceIndex]

        inputSprite.setImage(inputImgs[inputType])
        if (inputType == correctInput) {
            music.baDing.play()
            currentSequenceIndex++

            if (currentSequenceIndex == sequenceSize) {
                info.changeScoreBy(1)
                displayText("Nice job!", 7)
                music.magicWand.playUntilDone()
                pause(1000)
                sequenceSize++
                beginNextRound()
            }
            playerTurn = true
        }
        else {
            displayText("Wrong!", 2)
            music.buzzer.playUntilDone()
            pause(1000)
            displayText("The correct one is...", 2)
            inputSprite.setImage(inputImgs[correctInput])
            pause(2000)
            game.over(false)
        }
    }
}

function beginNextRound () {
    currentSequenceIndex = 0
    sequence = []
    inputSprite.setImage(assets.image`QuestionMark`)
    displayText("Watch & remember!")
    gameText.setPosition(80, 30)
    pause(1000)

    for (let index = 0; index < sequenceSize; index++) {
        let chosenInputIndex: number = randint(0, inputImgs.length - 1)
        let chosenInputImg: Image = inputImgs[chosenInputIndex]
        sequence.push(chosenInputIndex)
        inputSprite.setImage(chosenInputImg)
        music.zapped.play()
        pause(750)
    }

    pause(500)
    inputSprite.setImage(assets.image`QuestionMark`)
    playerTurn = true
}

let playerTurn: boolean = false

let sequenceSize: number = 1

let currentSequenceIndex = 0
let sequence: number[] = []

let gameText: TextSprite = textsprite.create("???")
gameText.setPosition(80, 30)

let inputSprite: Sprite = sprites.create(assets.image`QuestionMark`, SpriteKind.Prop)

info.setScore(0)
beginNextRound()
 