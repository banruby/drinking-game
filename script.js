$( document ).ready(function() {
    drinkingGame.init();
});

const drinkingGame = {
    availableQuestions: questionData, 
    init: function(){

        this.setEventListeners();
        const selectedQuestion = this.generateRandomQuestion(this.availableQuestions);
        this.showSelectedQuestion(selectedQuestion);

        // STEP 1 - get player names from user
        // STEP 2 - start game button
        // STEP 3 - generate a random question from the database
        // STEP 4 - put that random question on the screen

        // features to add
        // filter questions so two back to back questions are always of different categories
    },
    // players will eventually need to be user generated but this will do for now
    players : [
        "Ruby",
        "Lynsey",
        "Emma",
        "Dustin",
        "Shang",
        "Glen"
    ],
    generateRandomQuestion: function(array) {
            const randomQuestion = array[Math.floor(Math.random() * array.length)];
            
            const selectedId = randomQuestion.id;
            this.availableQuestions = this.availableQuestions.filter(question => question.id != selectedId);
            
            return randomQuestion;
    },
    showSelectedQuestion: function(selectedQuestion) {

        const category = selectedQuestion.category;
        let question = selectedQuestion.question;

        if (selectedQuestion.namesRequired) {
            const currentPlayers = this.getCurrentPlayers(selectedQuestion.namesRequired);

            currentPlayers.forEach(function(player, index){
                question = question.replace(`%Name${index}%`, player)
            })
        }

        $(".gameBoard").empty();
        $(".gameBoard").append(`<h2>${category}</h2>`);
        $(".gameBoard").append(`<p>${question}</p>`);
    },
    showNewQuestion: function() {
        if (this.availableQuestions.length > 1) {
            const selectedQuestion = this.generateRandomQuestion(this.availableQuestions);
            this.showSelectedQuestion(selectedQuestion);
        } else {
            this.availableQuestions = questionData;
            const selectedQuestion = this.generateRandomQuestion(this.availableQuestions);
            this.showSelectedQuestion(selectedQuestion);
        }
        
    },
    getCurrentPlayers: function(numberOfPlayers){
        const requiredPlayers = [];
        let availablePlayers = this.players;

        for (i=0; i < numberOfPlayers; i++) {
            const randomPlayer = availablePlayers[Math.floor(Math.random() * availablePlayers.length)];
            availablePlayers = availablePlayers.filter(player => player != randomPlayer);
            requiredPlayers.push(randomPlayer);
        }        
        return requiredPlayers;
    },
    setEventListeners: function(){
        $("button").on("click", function(){
            drinkingGame.showNewQuestion();
        })
    }
}