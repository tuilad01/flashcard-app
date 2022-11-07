const sound = new Audio("/audio/click_sound.mp3")

export const onClickWithSound = (handler?: any) => {
    sound.play();
    handler && handler();
}