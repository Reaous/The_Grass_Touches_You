import kaplay from "kaplay";
// import "kaplay/global"; // uncomment if you want to use without the k. prefix

const k = kaplay({
        width: 640,
        height: 360,
        letterbox: true,
        background : [100,60,40],
});

k.loadRoot("./"); // A good idea for Itch.io publishing later
k.loadSprite("bean", "sprites/Untitled.png");

const bean = k.add([k.pos(120, 80), k.sprite("bean")]);

k.onUpdate(() =>{
    if (k.isKeyDown("w")) bean.move(0,-200);
    if (k.isKeyDown("s")) bean.move(0,200);
});



k.onClick(() => k.addKaboom(k.mousePos()));


