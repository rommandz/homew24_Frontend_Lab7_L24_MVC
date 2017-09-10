var model = {
    currentPerson: {},
    allPersons: [
        {
        name: 'Lily Butler',
        score: 2,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/1.jpg'
      },
      {
        name: 'Waller Perry',
        score: 4,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/women/1.jpg'
      },
      {
        name: 'Tammi Donovan',
        score: 5,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/2.jpg'
      },
      {
        name: 'Doreen Flowers',
        score: 4,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/3.jpg'
      },
      {
        name: 'Price Pace',
        score: 2,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/4.jpg'
      },
      {
        name: 'Larson Maldonado',
        score: 1,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/5.jpg'
      },
      {
        name: 'Berg Bolton',
        score: 5,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/women/2.jpg'
      },
      {
        name: 'Mack Lott',
        score: 3,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/6.jpg'
      },
      {
        name: 'Rosanna Mcleod',
        score: 4,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/7.jpg'
      },
      {
        name: 'Rosalie Rice',
        score: 1,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/8.jpg'
      },
      {
        name: 'Virginia Buchanan',
        score: 2,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/women/3.jpg'
      },
      {
        name: 'Lorna Stein',
        score: 4,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/9.jpg'
      },
      {
        name: 'Rosalie Steele',
        score: 3,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/women/4.jpg'
      },
      {
        name: 'Wilcox Boyd',
        score: 5,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/10.jpg'
      },
      {
        name: 'Ollie Rice',
        score: 5,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/11.jpg'
      }
    ]
};

var control = {
    init: function(){
        listView.init();
        listView.render();

        scoresView.init();
        scoresView.render();

        profileView.init();
        briefInfoView.init();

        sortView.init();
        sortView.render();
    },
    getAllNames: function(){
        var names = [];
        model.allPersons.forEach(function(item){
            names.push(item.name);
        });
        return names;
    },
    getAllScores: function(){
        var scores = [];
        model.allPersons.forEach(function(item){
            scores.push(item.score);
        });
        return scores;
    },
    setCurrentPerson: function(index){
        model.currentPerson = model.allPersons[index];
        this.viewCurrentProfile();
        this.viewBriefInfo();
    },
    getCurrentPerson: function(){
        return model.currentPerson;
    },
    viewCurrentProfile: function(){
        profileView.render();
    },
    setCurrentPersonScore: function(value){
        model.currentPerson.score = value;
        profileView.render();
        scoresView.render();
        this.viewBriefInfo();
    },
    swapToTop: function (index) {
        if (index === 0) {
            return;
        }
        var arr = model.allPersons;
        var saved = arr[index-1];
        arr[index - 1] = arr[index];
        arr[index] = saved;

        listView.render();
        scoresView.render();
    },
    swapToBottom: function (index) {
        if (index === this.getAllNames().length -1) {
            return;
        }
        var arr = model.allPersons;
        var saved = arr[index+1];
        arr[index + 1] = arr[index];
        arr[index] = saved;

        listView.render();
        scoresView.render();
    },
    viewBriefInfo: function () {
        briefInfoView.render();
    }
};

var listView = {
    init: function(){
        this.$container = $('.names');
        this.handleClicks();
    },
    render: function(){
        var listStr = '';
        control.getAllNames().forEach(function(name){
            listStr += '<li>'+name+'</li>';
        });
        this.$container.html(listStr);
    },
    handleClicks: function(){
        this.$container.on('click','li', function(e){
            var currentIndex = $(e.target).index();
            control.setCurrentPerson(currentIndex);
        });
    }
};


var scoresView = {
    init: function(){
        this.$container = $('.scores');
        this.handleClicks();
    },
    render: function(){
        var listStr = '';
        control.getAllScores().forEach(function(score){
            listStr +=   '<li>'
                        +'  <span>'+score+'</span>'
                        +'  <input class="hidden score-input" type="text" value="'+score+'">'
                        +'</li>';
        });
        this.$container.html(listStr);
    },
    handleClicks: function(){
        this.$container.on('click', 'li', function(e){
            var $currentLi = $(e.target);
            var $currentSpan = $currentLi.find('span');
            var $currentInput = $currentLi.find('input.score-input');
            var currentIndex = $currentLi.index();
            if(!$currentInput.is('.hidden')) {
                return false;
            }
            control.setCurrentPerson(currentIndex);
            $currentSpan.addClass('hidden');
            $currentInput.removeClass('hidden').focus();
        });
        this.$container.on('focusout .score-input', function(e){
            var newScore = $(e.target).val();
            control.setCurrentPersonScore(newScore);
        });
    }
};

var sortView ={
    init: function () {
        this.$container = $(".sort");
        this.handleClicks();
    },
    render: function () {
        var length = model.allPersons.length;
        this.$container.html("");
        for (var i = 0; i < length; i++) {
            this.$container.append(`<li><div class = "up"></div><div class = "down"></div></li>`);
        }
    },
    handleClicks: function () {
        var indexOfClicked;
        this.$container.on("click", "div", function (event) {
            if ($(this).hasClass("up")) {
                indexOfClicked = $(this).parent("li").index();
                control.swapToTop(indexOfClicked);
            } else {
                indexOfClicked = $(this).parent("li").index();
                control.swapToBottom(indexOfClicked);
            }
        });
    }
};


var profileView = {
    init: function(){
        this.$container = $('.profile');
    },
    render: function(){
        var currentPerson = control.getCurrentPerson();
        var tempalte = '<img src="'+currentPerson.photoUrl+'">'
                        + '<h3>'+ currentPerson.name +'</h3>'
                        + '<p>Score: '+currentPerson.score+'</p>';
        this.$container.html(tempalte);
    }
};

var briefInfoView = {
    init: function () {
        this.$container = $(".briefInfo");
    },
    render: function () {
        var currentPerson = control.getCurrentPerson();
        var info = `<p>Selected person is <b>${currentPerson.name}</b>. Person's score is: <span>${currentPerson.score}</span></p>`;
        this.$container.html(info);
    }
};

control.init();
