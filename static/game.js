// First we will create a game object with a couple of variables that will store all of user settings,keep track of current turn,and the generated sequence etc.

var game={
   level:1,
   turn:0, // current turn
   score:0, // current score
   difficulty:1,
   active:false, // Whether a turn is active or not
   handler:false, // Whether the click and sound handlers are active
   shape:'.shape', // Cached string for the pad class
   genSequence:[], // Array containing the generated/randomized pads
   plaSequence:[],  // Array containing the users pad selections

// We will create a function called flash which will accept 4 variables.
//We'll pass iit the element we wish to flash, the amount of times we want that element to flash, the speed of flash , and the pad number on which to trigger the sound.
   flash: function(element,times,speed,pad){

     var that=this;

     if(times>0){

       that.playSound(pad);
       element.stop().animate({opacity:'1'},{
          
         duration:50,
         complete:function(){

         	element.stop().animate({opacity:'0.6'},200);
         }


       });
     }

     if(times>0){

        setTimeout(function(){
         
          that.flash(element,times,speed,pad);

        },speed);
        times-=1;
     }


   },

   playSound: function(clip){
    // console.log(clip);
     var sound=$('.sound'+clip)[0]; // since its a class selectorwe do like this
    // console.log(sound);
     sound.currentTime=0;  // Reset audio position to start of clip
     sound.play();        // Play sound again

   },

   randomizePad: function(passes){

      for(i=0;i<passes;++i){

        this.genSequence.push(Math.floor(Math.random()*4+1));

      }


   },

 displaySequence: function(){

    var that=this;
    $.each(this.genSequence,function(index,val){

      setTimeout(function(){

        that.flash($(that.shape+val),1,300,val);

      },500*index*that.difficulty);

    });

  },

  displayScore: function(){

   $('.score h2').text('Score: '+this.score);

  },

  keepScore: function(){

   this.score+=2;
   this.displayScore();

  },

  logPlayerSequence: function(pad){

    this.plaSequence.push(pad);
    this.checkSequence(pad);

  },

  checkSequence: function(pad){

     that=this;

     if(pad!==this.genSequence[this.turn]){

       this.incorrectSequence();
     }
     else{

       this.keepScore();
       this.turn++;

     }


     if(this.turn===this.genSequence.length){
 
        this.level++;
        this.active=false;
        setTimeout(function(){
   
          that.newLevel();
    
        },1000);

     }

  },

  incorrectSequence: function(){

     var corPad=this.genSequence[this.turn],
     that=this;
     this.active=false;
    // this.displayLevel();
     this.displayScore();
   
     setTimeout(function(){
       
       that.flash($(that.shape+corPad),4,300,corPad);

     },500);

    $('.start').show();

 },

 initPadHandler: function(){

    that=this;

    $('.pad').on('mouseup',function(){

         if(that.active===true){
            var temp=this.getAttribute('class');
            var whichShape=temp[temp.length-1];
            var pad=parseInt(whichShape,10);
          
            that.flash($(this),1,300, pad);
            that.logPlayerSequence(pad);

         }
    });

    this.handler=true;


 },

 init: function(){  // initialises the game

    if(this.handler===false){  // checks to see if the handlers are already active
      // console.log("Falsy bitch");
       this.initPadHandler();  // if not activate them

    }

    this.newGame();     // reset the game defaults


 },

 newGame: function(){

    this.level=1;
    this.score=0;
    this.newLevel();
    //this.displayLevel();
    this.displayScore();

 },

 newLevel: function(){

    this.genSequence.length=0;
    this.plaSequence.length=0;
    this.pos=0;
    this.turn=0;
    this.active=true;

    this.randomizePad(this.level); // Randomize pad with correct amount of numbers for this level
    this.displaySequence(); // Show the user sequence

 }

};

 $(document).ready(function(){

   $('.start').click(function(){
      
      //alert("Sharky is a bitch\n");
      $(this).hide();
      game.init();

   });

 });