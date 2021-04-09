
    // Fonction Génération d'un aléatoire : 
    function getRandom(test) {
        return Math.floor(Math.random() * test)
      }
    // Fonction Génération Position Aléatoire x et y
    let RandomPosition = function(number) {
        this.x=getRandom(number);
        this.y=getRandom(number);
      }

class map {
    constructor (size,playerOne,playerTwo,Weapons) {
        this.size = size;
        this.domGameMap = $('#gameMap');
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
        this.Weapons = Weapons;
    }
    // Methode Tableau 10x10 : 
    generateMap() {
        this.domGameMap.html("");
        let rowTab = new Array(this.size);
            for (var y = 0; y < this.size; y++) {
                let row = $('<div>').addClass('boxesRow'); //création des lignes
                for (var x = 0; x < this.size; x++) {
                    rowTab[x] = new Array(this.size)
                    //mettre les id sur chaque case
                    let box = $('<div>').addClass('box available');
                    box.attr('id',"box-"+[y]+[x]); //définit la valeur de l'attribut "id" des "box"
                    row.append(box); //insère les éléments "box" dans les lignes "row" 
                }
                this.domGameMap.append(row);
            }
            this.addWall();
            this.addPlayer(this.playerOne,this.playerTwo);
            this.addWeapons(this.Weapons);
            this.checkCaseToMoove(this.playerOne,this.playerTwo);
            }
    // Methode Placer les murs : 
    addWall() {
        for (let i = 0; i < this.size; i++) {
            let randomPosition = new RandomPosition(this.size);
            let jumbo = document.getElementById("box-"+[randomPosition.y]+[randomPosition.x]);
            if (!jumbo.classList.contains("available")){
                i--;
            } else {
                jumbo.classList.remove("available");
                jumbo.classList.add("Wall");
            }
        }
    }
     // Methode qui créer des nouveaux personnages en fonction des conditions de placement possible
    doRandomPlayer(player) {
        let randomPosition = new RandomPosition(this.size);
        player.x = randomPosition.x;
        player.y = randomPosition.y
        while (!$('#box-'+player.y+player.x).hasClass("available") || this.noTouch(this.playerOne,this.playerTwo) == false){
            randomPosition = new RandomPosition(this.size);
            player.x = randomPosition.x;
            player.y = randomPosition.y; 
        }
        // place le joueur dans le DOM
        $('#box-'+player.y+player.x).addClass(player.name);
        $('#box-'+player.y+player.x).removeClass("available");
    }
    // méthode qui place chaque personnage sur la carte en fonction de la méthode doRandomPlayer()
    addPlayer(playerOne,playerTwo) {
        this.doRandomPlayer(playerOne);
        this.doRandomPlayer(playerTwo);
    }
    // Methode NoTouch : vérifie que les joueurs ne se touche pas pour le placement.
    noTouch = (player, nextPlayer) => {
        for (let i=0;i<4;i++) {
            if( player.x === nextPlayer.x && player.y === nextPlayer.y ){
                return false;
            }
            if( player.x === nextPlayer.x && player.y+i === nextPlayer.y ){
                return false;
            }
            if( player.x === nextPlayer.x && player.y-i === nextPlayer.y ){
                return false;
            }
            if( player.x+i === nextPlayer.x && player.y === nextPlayer.y ){
                return false;
            }
            if( player.x-i === nextPlayer.x && player.y === nextPlayer.y ){
                return false;
            }
            if ( player.x === nextPlayer.x+1 && player.y === nextPlayer.y+i){
                return false;
            }
            if ( player.x === nextPlayer.x-1 && player.y === nextPlayer.y-i){
                return false;
            }
            if ( player.x === nextPlayer.x+i && player.y === nextPlayer.y-1){
                return false;
            }
            if ( player.x === nextPlayer.x-i && player.y === nextPlayer.y+1){
                return false;
            }
        }
        return true;
    }
    // Methode pour placer les armes qui fonctionne comme doRandomPlayer()
    addWeapons(Weapons) {
        for (let i = 0 ; i < 4; i++) {
            let randomPosition = new RandomPosition(this.size);
        Weapons[i].x = randomPosition.x;
        Weapons[i].y = randomPosition.y
        while ( $('#box-'+Weapons[i].y+Weapons[i].x).hasClass("Wall") || 
                $('#box-'+Weapons[i].y+Weapons[i].x).hasClass(this.playerOne.name) || 
                $('#box-'+Weapons[i].y+Weapons[i].x).hasClass(this.playerTwo.name) || 
                $('#box-'+Weapons[i].y+Weapons[i].x).hasClass('weapon')){
            randomPosition = new RandomPosition(this.size);
            Weapons[i].x = randomPosition.x;
            Weapons[i].y = randomPosition.y; 
        }
        // place le joueur dans le DOM
        $('#box-'+Weapons[i].y+Weapons[i].x).removeClass("available");
        $('#box-'+Weapons[i].y+Weapons[i].x).addClass(Weapons[i].name);
        $('#box-'+Weapons[i].y+Weapons[i].x).addClass("weapon");
        }
    }
    
    // Methode qui ajoute les cases de mouvements autour du personnage ciblé en paramètre :
    // on ajoute donc 1 seule case tant que la case est available ou weapon et pas un joueur.
    // on créer une nouvelle variable qui prend le nouveau x ou y en fonction de la case
    // puis si on clique sur la case "active" alors on déclenche la fonction qui bouge le personnage.
    checkCaseToMoove(player,nextPlayer) {
        for (let i=1; i<4; i++) {
            let box = $('#box-'+player.y+(player.x+i));
            if (box.hasClass("available") || box.hasClass("weapon") && !box.hasClass(nextPlayer.name) ) {
                box.addClass("active");
                let x = player.x+i;
                let y = player.y;
                box.click(()=> {
                    this.mooveOnClick(player, x, y, nextPlayer)
                });
            } else
                break;
        }
        for (let i=1; i<4; i++) {
            let box = $('#box-'+player.y+(player.x-i));
            if (box.hasClass("available") || box.hasClass("weapon")&& !box.hasClass(nextPlayer.name) ){
                box.addClass("active");
                let x = player.x-i;
                let y = player.y;
                box.click(()=> {
                    this.mooveOnClick(player, x, y, nextPlayer)
                });
            } else
            break;
        }
        for (let i=1; i<4; i++) {
            let box = $('#box-'+(player.y+i)+player.x);
            if (box.hasClass("available") || box.hasClass("weapon")&& !box.hasClass(nextPlayer.name) ) {
                box.addClass("active");
                let x = player.x;
                let y = player.y+i;
                box.click(()=> {
                    this.mooveOnClick(player, x, y, nextPlayer)
                });
            } else
            break;
        }
        for (let i=1; i<4; i++) {
            let box = $('#box-'+(player.y-i)+player.x);
            if (box.hasClass("available") || box.hasClass("weapon")&& !box.hasClass(nextPlayer.name) ) {
                box.addClass("active");
                let x = player.x;
                let y = player.y-i;
                box.click(()=> {
                    this.mooveOnClick(player, x, y, nextPlayer)
                });
            } else
            break;
        }
    }
    // Methode qui déplace le joueur ciblé en paramètre sur le nouvel x et y pris dans checkcasetomoove()
    // à la fin de la méthode on relance checkcasetoomoove mais sur l'autre joueur
    // ce qui inversera les joueurs en permanence et donc rotation parfaite.
    mooveOnClick(player,x,y,nextPlayer) {
       let box = $('#box-'+player.y+player.x);
       box.removeClass(player.name);
       box.addClass("available");
       this.removeActivePos();
       player.x = x;
       player.y = y;
       box = $('#box-'+player.y+player.x);
       box.addClass(player.name);
       box.removeClass("available");
       this.checkCaseToMoove(nextPlayer,player);
       this.checkWeaponOnCase(player);
       if (this.checkFight(player, nextPlayer) === true ){
           console.log("le combat commence");
           this.startFight(player,nextPlayer);
    }
}
// méthode qui permet de d'enlever les cases active et de désactiver le click sur l'ancienne case active
    removeActivePos() {
        $(".active").each(function() {
            $(this).off("click");
            $(this).removeClass("active");
        });
    }
// méthode qui permet de détecter si il y a une arme sur la case
    checkWeaponOnCase(player) {
        let box = $('#box-'+player.y+player.x)
        if (box.hasClass("weapon")) {
            player.lastWeapon = player.weapon;
            this.pickupWeapon(player, this.Weapons);
        }
    }
// méthode qui permet de prendre l'arme sur la case
    pickupWeapon(player,Weapons) {
        let boxPlayer = $('#box-'+player.y+player.x);
        let idWeapon = $('#'+player.name+'-weapon');
        for (let i=0; i<5;i++) {
            if (this.getWeaponClass(player) === Weapons[i].name) {
                player.weapon = Weapons[i];
                boxPlayer.removeClass(Weapons[i].name);
                boxPlayer.removeClass('weapon');
                boxPlayer.addClass(player.lastWeapon.name);
                boxPlayer.addClass('weapon');
                idWeapon.removeClass();
                idWeapon.addClass(Weapons[i].name);
                $('#'+player.name+'-dmg').html(Weapons[i].dps);
            }
        }
    }
// récupérer les classes et les index dans un tableau. la classe à l'index 2 est la l'arme présente.
    getWeaponClass(player) {
        let lesClasses = document.getElementById("box-"+player.y+player.x).className;
        var tab_classes = [];
        lesClasses  = lesClasses.split(' ');
                for (var i = 0; i<lesClasses.length; i++) {
                    if (lesClasses[i]) {
                    tab_classes .push(lesClasses[i]);
                    }
                }
                return tab_classes[1];
    }
// Méthode pour savoir si les joueurs sont l'un à coté de l'autre pour démarrer le combat
    checkFight(player, nextPlayer) {
            if( player.x === nextPlayer.x && player.y+1 === nextPlayer.y ){
                return true;
            }
            if( player.x === nextPlayer.x && player.y-1 === nextPlayer.y ){
                return true;
            }
            if( player.x+1 === nextPlayer.x && player.y === nextPlayer.y ){
                return true;
            }
            if( player.x-1 === nextPlayer.x && player.y === nextPlayer.y ){
                return true;
            }
            return false;
    }
    startFight(player,nextPlayer) {
        player.combatBegin();
        nextPlayer.combatEnding();
        this.removeActivePos();
    }
}
