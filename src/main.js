import kaplay from "kaplay";
// import "kaplay/global"; // uncomment if you want to use without the k. prefix

const k = kaplay({
        width: 640,
        height: 360,
        letterbox: true,
        background : [100,60,40],
});

k.loadRoot("./"); 


k.loadSprite("you", "sprites/Untitled.png");
k.loadSprite("room","sprites/room warped.png" )
k.loadSprite("swipe","sprites/swipe.png" ,{ singular :true})

k.loadShader(
    "swipe",
    null,
    `
    uniform float cutoff;
    uniform sampler2D mask;

    vec4 frag(vec2 pos , vec2 uv , vec4 color , sampler2D tex) {
        vec4 p = texture2D(mask ,uv);
        if (p.r < cutoff) {
            return vec4(0,0,0,1);
        } else {
            return texture2D(tex, uv);
        }   
    }
`,
);


let swipeFrame;
k.onLoad(() => {
    swipeFrame = k.getSprite("swipe").data.frames[0];
});


k.scene("roomstart", () => {

    const speed = (300)


    k.add([
        k.sprite("room", 
            {width: k.width(),height: k.height()}),
            k.pos(0,0),
            k.z(-100),
        ]);

    const door = k.add([
        k.rect(50,60),
        k.area(),
        k.pos(310,0),
        k.body({isStatic:true}),
        k.color(0,0,0,),
        k.opacity(0),
        "door_out"
    ])
//boundaries(they take alot of time to make uk for somethign fkn invisible)

    k.add([
        k.rect (10,360),
        k.area(),
        k.pos(0,0),
        k.body({isStatic:true}),
        k.opacity(0),
        "boundaryleft"
    ])

    k.add([
        k.rect (1,360),
        k.area(),
        k.pos(630,0),
        k.opacity(0),
        k.body({isStatic:true}),
        "boundaryright"
    ])
    
    k.add([
        k.rect(640,1),
        k.area(),
        k.pos(0,340),
        k.opacity(0),
        k.body({isStatic:true}),
        "boundarybottom"
    ])

    k.add([
        k.rect(260,1),
        k.area(),
        k.pos(0,100),
        k.opacity(0),
        k.body({isStatic:true}),
        "boundarytop 1"
    ])

    k.add([
        k.rect(230,1),
        k.area(),
        k.pos(360,100),
        k.opacity(0),
        k.body({isStatic:true}),
        "boundarytop2"
    ])


    const player = k.add([
        k.pos(100,180),
        k.sprite("you"),
        k.area(),
        k.body(),
    ])
    
    k.onUpdate(() => {
        if (k.isKeyDown("w")) player.move(0,-speed);
        if (k.isKeyDown("s")) player.move(0,speed);
        if (k.isKeyDown("a")) player.move(-speed,0);
        if (k.isKeyDown("d")) player.move(speed,0);
    })
    

    player.onCollide("door_out",() => {
            k.go("out1");       
        }

    );
});

k.scene("out1",() => {
    k.add([
        k.text("placeholder"),
        k.pos(k.center()),
        k.anchor("center"),
    ]);
});

k.go("roomstart");