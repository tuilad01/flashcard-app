const sound = new Audio("/audio/button_click_sound.mp3")

export const onClickWithSound = (handler: any) => {
    sound.play();
    handler();
}