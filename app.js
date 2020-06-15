class Drumkit{
    constructor(){
        this.index=0;
        this.bpm=150;
        this.pads=document.querySelectorAll('.pad');
        this.playbutton=document.querySelector('.play');
        this.kickAudio=document.querySelector('.kick-sound');
        this.snareAudio=document.querySelector('.snare-sound');
        this.hihatAudio=document.querySelector('.hihat-sound');
        this.select=document.querySelectorAll("select");
        this.currentkick='./assets/kick-classic.wav';
        this.currentsnare='./assets/snare-classic.wav';
        this.currenthihat='./assets/hihat-classic.wav';
        this.startstop=null;
        this.mutebtns=document.querySelectorAll(".mute");
        this.tempoSlider=document.querySelector(".slider");
    }
    repeat(){
        let step=this.index % 8;
        const activeBars=document.querySelectorAll(`.b${step}`);
        activeBars.forEach(bar=> {
            bar.style.animation=`beat .3s alternate ease-in-out 2`;
            if(bar.classList.contains("active")){
                
                if(bar.classList.contains("kick-pad")){
                    this.kickAudio.currentTime=0;
                    this.kickAudio.play();
                }
                if (bar.classList.contains("snare-pad")){
                    this.snareAudio.currentTime=0;
                    this.snareAudio.play();
                }
                if (bar.classList.contains("hihat-pad")){
                    this.hihatAudio.currentTime=0;
                    this.hihatAudio.play();
                }
            }
        });

    
        this.index++;
    }
    activePad(){
        this.classList.toggle("active");
    }

    changeSound(e) {
        const selectionName=e.target.name;
        const selectionValue=e.target.value;
        switch (selectionName){
            case "kick-select":
                this.kickAudio.src=selectionValue;
                break;
            case "snare-select":
                this.snareAudio.src=selectionValue;
                break;
            case "hihat-select":
                this.hihatAudio.src=selectionValue;
                break;
        }

    }

    mute(e){
        const mute_sel=e.target.getAttribute("data-track");
        e.target.classList.toggle("active");

        if(e.target.classList.contains("active")){
            switch (mute_sel){
                case "0":
                    this.kickAudio.volume =0;
                     break;
                case "1":
                    this.snareAudio.volume =0;
                     break;
                case "2":
                    this.hihatAudio.volume =0;
                     break;

            }
        }else{
            switch (mute_sel){
                case "0":
                    this.kickAudio.volume =1;
                     break;
                case "1":
                    this.snareAudio.volume =1;
                     break;
                case "2":
                    this.hihatAudio.volume =1;
                     break;

            }

        }
    }
    changeTempo(e){
        const tempotxt=document.querySelector(".tempo-nr");
        tempotxt.innerHTML=e.target.value;

    }
    updateTempo(e){
        this.bpm=e.target.value;
        clearInterval(this.startstop);
        this.startstop = null;
        const playbtn=document.querySelector(".play");
        if(playbtn.classList.contains("active")){
            this.start();
        }
    }
    start(){
        const interval=(60/this.bpm)*1000;
        if(!this.startstop){
           this.startstop =  setInterval(()=>{
                this.repeat();
            },interval)
        }
        else{
            clearInterval(this.startstop);
            this.startstop = null;
        }
        
    }
}

const drumKit=new Drumkit();

drumKit.pads.forEach(pad =>{
    pad.addEventListener('click',drumKit.activePad);
    pad.addEventListener('animationend',()=>{
        pad.style.animation="";
    })
});

drumKit.playbutton.addEventListener('click',function(){
    drumKit.start();        
})

drumKit.select.forEach(select=>{
    select.addEventListener("change",function(e){
        drumKit.changeSound(e);
    })

})
drumKit.mutebtns.forEach(mute=>{
    mute.addEventListener("click",function(e){
        drumKit.mute(e);
    })

})

    drumKit.tempoSlider.addEventListener("input",function(e){
        drumKit.changeTempo(e);
    })
    drumKit.tempoSlider.addEventListener("change",function(e){
        drumKit.updateTempo(e);
    })
