import kaplay from "kaplay";
// import "kaplay/global"; // uncomment if you want to use without the k. prefix

const k = kaplay({
        width: 640,
        height: 360,
        letterbox: true,
        background : [100,60,40],
});

k.loadRoot("./"); 

k.loadSprite("info","sprites/info.png")
k.loadSprite("you", "sprites/Untitled.png");
k.loadSprite("room1","sprites/room.jpg" )
k.loadSprite("room2","sprites/room_warped.png")
k.loadSprite("room3","sprites/door..png")
k.loadSprite("swipe","sprites/swipe.png" ,{ singular :true})
k.loadSound("speak","sprites/type_sound.mp3")
k.loadSound("impact","sprites/impact.mp3")
k.loadSprite("grass","sprites/grass.png")
k.loadSprite("hell","sprites/hell.png")
k.loadSprite("forest","sprites/forest.png")
k.loadSprite("hill","sprites/mountain.png")
k.loadSound("rock","sprites/rock.mp3")
k.loadSound("cry","sprites/cry.mp3")
k.loadSprite("sky","sprites/sky.png")
k.loadSprite("moon","sprites/moon.jpg")



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

    const speed = (200)

        const player = k.add([
        k.pos(100,180),
        k.sprite("you"),
        k.area(),
        k.body(),
        "punpun",
        k.stay()
    ])
    
    
    player.onUpdate(() => {
        if (isTalking) return;
        if (k.isKeyDown("w")) player.move(0,-speed);
        if (k.isKeyDown("s")) player.move(0,speed);
        if (k.isKeyDown("a")) player.move(-speed,0);
        if (k.isKeyDown("d")) player.move(speed,0);
        k.stay();
    })

const room1 =   k.add([
        k.sprite("room1", 
            {width: k.width(),height: k.height()}),
            k.pos(0,0),
            k.z(-100),
        ]);


const room2 = k.add([
        k.sprite("room2",
            {width: k.width(),height:k.height()}),
            k.pos(0,0),
            k.z(-100),
            k.opacity(0)
        ]);


const room3 = k.add([
        k.sprite("room3",
            {width: k.width(),height:k.height()}),
            k.pos(0,0),
            k.z(-100),
            k.opacity(0)
        ]);

    const info = k.add([
        k.sprite("info", {width: 250, height :100}),
        k.pos(480,150),
        k.z(0),
        k.opacity(1),
        k.z(100)
            
        ]);

    const infobox = k.add([ 
        k.rect(35 ,40),
        k.pos(587,164),
        k.z(0),
        k.opacity(1)

    ])    
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
        "boundaryleft",
        k.stay()
    ])

    k.add([
        k.rect (1,360),
        k.area(),
        k.pos(630,0),
        k.opacity(0),
        k.body({isStatic:true}),
        "boundaryright",

    ])
    
    k.add([
        k.rect(640,1),
        k.area(),
        k.pos(0,340),
        k.opacity(0),
        k.body({isStatic:true}),
        "boundarybottom",
        k.stay("out1"),
    ])

    k.add([
        k.rect(260,1),
        k.area(),
        k.pos(0,100),
        k.opacity(0),
        k.body({isStatic:true}),
        "boundarytop 1",
        
    ])

    k.add([
        k.rect(250,1),
        k.area(),
        k.pos(380,100),
        k.opacity(0),
        k.body({isStatic:true}),
        "boundarytop2",
        
    ])


    



const dialogs = [
    "The grass: ",
    "We are tired of waiting for you to touch us ",
    "come outside lil bro....",
    "we are waiting" ,];


let curDialog = 0;
let isTalking = false;

const textbox = k.add([
    k.rect(k.width() - 220,k.height() -300, {radius: 3}),
    k.anchor("center"),
    k.pos(k.center().x,k.height()-100),
    k.outline(4),
    k.fixed(),
    k.z(100),
    k.opacity(0),
]);

const txt = textbox.add([
    k.text("",{
        size: 22,
        width: k.width()-140,
        align:"center", }),
    k.color(0,0,0),
    k.anchor("center"),
    k.pos(0,0),
    k.stay()

]);

   const grass = k.add([
        k.sprite("grass"),
        k.scale(0.3),
        k.opacity(0),
        k.pos(110,120),
        k.z(200),
        "grass",
    ])


function startdialogue() {
    isTalking = true;
    curDialog= 0;
    textbox.opacity = 1;
    txt.text = dialogs[curDialog]
    room2.opacity = 1;
    grass.opacity = 1;
}

function nextDialogue() {
    curDialog++;

    if (curDialog<dialogs.length){
        txt.text =dialogs[curDialog];
    } else {
    textbox.opacity =0 ;
    grass.opacity =0;
    isTalking=false;
    const wait =k.add([
        k.rect(300,50),
        k.pos(170,240),
        k.color(255,255,255),
        k.opacity(0.5),
        k.area(),
        "wait"
    ])
    }

}
let s1 =0
player.onCollide("wait",() => {
room3.opacity =1;
if (s1===0)
    {k.play("impact");{
        k.setVolume(0.5)
    } s1++}
else{
txt.opacity=0 ;
};
});

{k.onKeyPress(["space"],()=> {
    if (isTalking) {
        nextDialogue();
    }
}
)};
let dcount =0

player.onCollide("boundaryright",()=>{
    if(!isTalking){
        startdialogue();
        info.opacity = 0,
        infobox.opacity=0,
        dcount++;
    }
})

//doesnt work for some fucking reaosn maybe onyl checks linearly not always
if (dcount > 0) {
    k.add([
    k.text("boo" , {
        size:(32),
        }),
]);
}

    player.onCollide("door_out",() => {
            k.go("out1");       
        }

    );
});

k.scene("out1",() => {
    k.setGravity(0);
    const player =k.get("punpun")[0]

       const grass = k.add([
        k.sprite("grass"),
        k.scale(0.2),
        k.opacity(1),
        k.pos(20,12),
        k.z(200),
        "grass",
    ])

    player.pos =vec2(200,100)
    player.vel = k.vec2(0, 0); 
    player.scale = k.vec2(1, 1);


    k.add([
        k.rect(800,1),
        k.pos(30,40),
        k.opacity(0.5),
        k.area(),
        k.body({isStatic:true})
    ])

        k.add([
        k.rect (1,360),
        k.area(),
        k.pos(600,0),
        k.opacity(0),
        k.body({isStatic:true}),
        ])

    const text =k.add([
        k.text("'The world is beatiful Twin'",{size:(32)}), 
        k.color(0,0,0),
        k.pos(130,50),
        k.opacity(1),
        k.area(),
        k.body({isStatic:true}),
    ])


    const subtext =k.add([
        k.text("where do you want to explore?",{size:(15)}),
        k.pos(20,120)

    ])

    text.onHover( () => {
        text.color = k.rand(rgb(255, 255, 255));
        k.scale(2)
    })

    player.onCollide("text",() => {
        text.color = k.rand(rgb(255,255,255));
    })

    const hell = k.add([
        k.rect(100,100),
        k.pos(20,220),
        k.color(rgb(224, 96, 22)),
        k.area(),
        k.body({isStatic:true}),
        "hell"
    ])

    const skyscraper = k.add([
        k.rect(100,100),
        k.pos(200,220),
        k.color(rgb(101, 176, 26)),
        k.area(),
        k.body({isStatic:true}),
        "skyscrapper"
    ])

    const blackhole = k.add([
        k.rect(100,100),
        k.pos(400,220),
        k.color(rgb(0, 0, 0)),
        k.area(),
        k.body({isStatic:true}),
        "black"

    ])


    player.onCollide("hell", () => {
        k.go("hell");

    player.onCollide("skyscrapper", () => {
        k.go("skyscrapper");

    })

    });

});

k.scene("hell",() => {

    k.setGravity(300);


    const player =k.get("punpun")[0]
    
    player.pos = k.vec2(200,100);

    const background = k.add([
        k.sprite("hell",{
        width : k.width(),height : k.height()}),
        k.pos(0,0),
        k.z(-100)
        ]);

const hill =k.add([
    k.sprite("hill"),
    k.pos(0,0),
    k.z(-20),
    k.opacity(1)
])

k.add([
    k.rect(400,300),
    k.pos(90,220),
    k.area(),
    k.body({isStatic:true}),
    k.opacity(0)
])

k.add([
    k.rect(200,300),
    k.pos(30,240),
    k.area(),
    k.body({isStatic:true}),
    k.opacity(0),

])

k.add([
    k.rect(10,250),
    k.opacity(0),
    k.pos(550,300),
    k.area(),
    k.body({isStatic:true}),
    k.anchor("center"),
    k.rotate(130),

])

const ball =k.add([
    k.circle(30),
    k.pos(450,200),
    k.area(),
    k.body({gravityScale:50}),
    k.color(rgb(202, 159, 16)),
    k.offscreen(),
    "ball"


])

const intro = k.add([
    k.text("You have a urge to push over the boulder for some reason.",{size :30,width:340}),
    k.opacity(1),
    k.pos(50,30),
    "intro"
])

const back =k.add([
    k.text("Go back to selector =>",{size:17}),
    k.opacity(0),
    k.pos(420,140),
    k.color(rgb(106, 7, 245)),
    "back"

])

ball.onExitScreen( () => {
    k.add([
        k.text("You hear sobs coming from the bottom of the mountain from someone named sisyphus, poor guy ",{size:26 ,width:340}),
        k.pos(100,40)]);
    intro.opacity = 0;
    back.opacity = 1;
    k.play("rock");
    k.play("cry",{volume:0.3});
});


const collide = k.add([
    k.rect(10,360),
    k.opacity(0.2),
    k.pos(640,0),
    k.area(),
    "collide",
])

player.onCollide("collide", ()=> 
    {k.go("out1")
    k.setGravity(0);
    
    });

});

k.scene("skyscrapper",() => {
    
    const speed = (1)

    const background = k.add([
        k.sprite("sky", {width :k.width(),height: k.height()}),
        k.z(-100)
    ])

    const player = k.get("punpun")[0];

    k.onUpdate( () => {
        const s = k.map(player.pos.y,110,300,0.25,1.5);
        player.scale=k.vec2(k.clamp(s,0.25,1.5))
    })

    const moon = k.add ([
        k.circle(20),
        k.opacity(0),
        k.pos(320,60),
        k.area(),
        k.body({isStatic:true}),
        "moon"

    ])

    k.add([
        k.rect(200,100),
        k.pos(0,0),
        k.opacity(0),
        k.area(),
        k.body({isStatic:true}),

    ])


        k.add([
        k.rect(200,100),
        k.pos(470,0),
        k.opacity(0),
        k.area(),
        k.body({isStatic:true}),

    ])

    player.onCollide("moon", ()=> {
        k.go("moon")

    })

});

k.scene("moon", () => {
    k.add([
        k.sprite("moon", {width:k.width(), height:k.height()}),
        k.z(-100),
    ]);

const player= k.get("punpun")[0]

    player.pos = k.vec2(300,300);


    k.add([
        k.text("See when you are open to explore and go outside even reaching the moon isn't imposible! :D",{size:25,width:200}),
        k.pos(20,20)
    ]);

    k.add([
        k.text("<= go back to earth",{size:18}),
        k.pos(440,100)
    ])

    const earth = k.add([
        k.circle(40),
        k.pos(330,100),
        k.opacity(0),
        k.body({isStatic:true}),
        k.area(),
        "earth",
    ])

        player.onCollide("earth", () =>{
            k.go("out1")

        })

})

k.go("roomstart");