class player {
    constructor (playerName,weapon) {
        this.name = playerName;
        this.life = 100;
        this.x = 0;
        this.y = 0;
        this.weapon = weapon; 
        this.lastWeapon = "lastWeapon";
        $('#' + this.name +'-score').html(this.life);
    }

    fight = (nextPlayer) => {
        
        // initialise l'option de combat du joueur sur attack.
        this.optionFigth="attack";
        let damagePower = this.weapon.dps;
        
        if(nextPlayer.optionFigth==="defend") {
            damagePower = (this.weapon.dps/2);
        }

        if(nextPlayer.life - damagePower > 0) {
            nextPlayer.life = nextPlayer.life - damagePower;
        } 
        else {
            nextPlayer.life = 0
            if(nextPlayer.name == "Player-1") {
                $('#celebration-img').attr('src', 'img/sasuke.png');
                $('#winner').html("Sasuke");
            }
            else {
                $('#celebration-img').attr('src', 'img/naruto.png');
                $('#winner').html("Naruto"); 
            } 
            $('#CelebrationModal').modal('show'); 
        }

        $('#' + nextPlayer.name +'-score').html(nextPlayer.life);
        $('#' + nextPlayer.name +'-visualScore').css("width", nextPlayer.life + "%").attr("aria-valuenow", nextPlayer.life);
        
        nextPlayer.optionFigth="attack";
        
        this.combatEnding();
        
        if(nextPlayer.life > 0) {
        nextPlayer.combatBegin();
        }
        if (nextPlayer.life >70 ) {
            $('#' + nextPlayer.name +'-visualScore').addClass("bg-success");
        }
        if (nextPlayer.life <= 70) {
            $('#' + nextPlayer.name +'-visualScore').removeClass("bg-success");
            $('#' + nextPlayer.name +'-visualScore').addClass("bg-warning");
        }
        if (nextPlayer.life <= 40) {
            $('#' + nextPlayer.name +'-visualScore').removeClass("bg-warning");
            $('#' + nextPlayer.name +'-visualScore').addClass("bg-danger");
        }
    }

    combatBegin(){
        $("#"+this.name+"-attack").attr("disabled", false);
        $("#"+this.name+"-defend").attr("disabled", false);
        $("#"+this.name+"-attack").removeClass("disabled");	
        $("#"+this.name+"-defend").removeClass("disabled");
    }
    combatEnding(){
        $("#"+this.name+"-attack").attr("disabled", true);
        $("#"+this.name+"-defend").attr("disabled", true);
        $("#"+this.name+"-attack").addClass("disabled");	
        $("#"+this.name+"-defend").addClass("disabled");
    }
}


