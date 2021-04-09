$("#new-game").click(() => {
    

    let Weapon1 = new arm('rasengan',60);
    let Weapon2 = new arm('katana', 60);
    let Weapon3 = new arm("kunai",100);
    let Weapon4 = new arm('shuriken', 50);
    let Weapon5 = new arm ("fist", 10);
    let Weapons = [Weapon1, Weapon2,Weapon3,Weapon4,Weapon5];
    

    let playerOne = new player("Player-1",Weapon5);
    let playerTwo = new player("Player-2",Weapon5);
    
    let start = new map(10,playerOne,playerTwo,Weapons);
    start.generateMap();
    
    $('#Player-1-weapon').addClass(Weapon5.name);
    $('#Player-1-dmg').html('10');
    $('#Player-2-weapon').addClass(Weapon5.name);
    $('#Player-2-dmg').html('10');


    $("#Player-1-attack").click(() => {
        playerOne.fight(playerTwo);
    });
    $("#Player-1-defend").click(() => {
        playerOne.optionFigth = "defend";
        playerOne.combatEnding();
        playerTwo.combatBegin();
    });
    $("#Player-2-attack").click(() => {
        playerTwo.fight(playerOne);
    });
    $("#Player-2-defend").click(() => {
        playerTwo.optionFigth = "defend";
        playerTwo.combatEnding();
        playerOne.combatBegin();
    });
    $("#close").click(() => {
        document.location.reload();
    })
});
