// create tabs

function Tab(name, item, content) {
    this.name = name;
    this.item = item;
    this.content = content;
    this.taskList = [];
    this.active = false;
}

function Tabs() {
}

Tabs.prototype = [];
var tabs = new Tabs();

var tab1 = new Tab('home', '1', '1-content', false);
var tab2 = new Tab('work', '2', '2-content', false);
var tab3 = new Tab('rest', '3', '3-content', true);

tabs.push(tab1);
tabs.push(tab2);
tabs.push(tab3);

$('#addTab').click(function () {
    var name = $('#inputTab').val();
    console.log(name);
    var item = parseInt($('.tab-list').find('li:last').attr('id'), 10) + 1;
    var content = item + '-content';
    newTab(name, item, content);
});

function newTab(name, item, content) {
    var tab = new Tab(name, item, content);
    tabs.push(tab);
    console.log(tabs);
    $('.tab-list').append('<li id="' + item + '" class="nav-item tab"><a class="nav-link" href="#">' + name + '</a></li>');
    $('#allContentBlocks').append('<section id="' + content + '" class="row taskContent-center placeholders content"><div class="col-6 col-sm-3 placeholder task"><div class="form-group new-tab-form"> <input type="taskContent" class="form-control input-task" placeholder="New task"><textarea type="text" class="form-control input-comment" placeholder="Comment..."></textarea><button type="submit" class="btn btn-primary add-task">add</button> </div> </div></section>');
}

$('.tab-list').delegate('.tab', "click", function () {
    // var id = $(this).attr("tab-id");
    var id = $('.tab').index(this);
    console.log(id);
    tabs.activation(id);
});

Tabs.prototype.activation = function (id) {
    tabs.forEach(function (item, num) {
        if (num === id) {
            tabs[num].active = true;
            $('#' + tabs[num].item).addClass('active-tab');
            $('#' + tabs[num].content).addClass('active-content');

        } else {
            tabs[num].active = false;
            $('#' + tabs[num].item).removeClass('active-tab');
            $('#' + tabs[num].content).removeClass('active-content');
        }
    });
    console.log(tabs);
}

//create task

function Task(taskName, taskId, taskComment) {
    this.taskName = taskName;
    this.taskId = taskId;
    this.taskComment = taskComment;
    // this.active = false;
}

//add new task
$('main').delegate('.add-task', 'click', function () {
    var sectionId = $(this).closest('section').attr('id');
    var taskName = $('#' + sectionId).find('.input-task').val();
    var taskId;
    if ($('#' + sectionId).find('.task:last').index() === 0) {
        taskId = 'task-' + ($('#' + sectionId).find('.task:last').index() + 1);
    } else {
        var lastTask = $('#' + sectionId).find('.task:last').attr('id').split('-');
        taskId = 'task-' + (parseInt(lastTask[1]) + 1);
        console.log(taskId);
    }
    // var taskId = 'task-' + ($('#' + sectionId).find('.task:last').index() + 1);
    var taskComment = $('#' + sectionId).find('.input-comment').val();
    newTask(sectionId, taskName, taskId, taskComment);
});

function newTask(sectionId, taskName, taskId, taskComment) {
    var task = new Task(taskName, taskId, taskComment);
    tabs.forEach(function (tab, index) {
        if (tabs[index].content === sectionId) {
            tabs[index].taskList.push(task);
        }
    });
    console.log(tabs);
    $('#' + sectionId).append(' <div id="' + taskId + '" class="col-6 col-sm-3 placeholder task"><span class="text-muted name-task">' + taskName + '</span><br><span class="text-muted comment-task">' + taskComment + '</span><button type="submit" class="btn btn-primary edit-task">edit</button><button type="submit" class="btn btn-primary done-task">done</button><button type="submit" class="btn btn-primary remove-task">remove</button></div>');
}

//edit task
$('main').delegate('.edit-task', 'click', function () {
    var sectionId = $(this).closest('section').attr('id');
    var taskId = $(this).closest('.task').attr('id');
    // var taskName = $(this).closest('.name-task').val;
    var taskName = $('#' + taskId).find('.name-task').html();
    var taskComment = $('#' + taskId).find('.comment-task').html();
    console.log(sectionId, taskId, taskName, taskComment);
    editTask(sectionId, taskId, taskName, taskComment);
});

function editTask(sectionId, taskId, taskName, taskComment) {

    $('#' + taskId).children().remove();
    $('#' + taskId).append('<div class="form-group new-tab-form"><input type="text" class="form-control input-task" placeholder="" value="' + taskName + '"><textarea type="text" class="form-control input-comment" placeholder="">' + taskComment + '</textarea><button type="submit" class="btn btn-primary save-task">save</button></div>');
}

// save task
$('main').delegate('.save-task', 'click', function () {
    var sectionId = $(this).closest('section').attr('id');
    var taskId = $(this).closest('.task').attr('id');
    var taskName = $('#' + taskId).find('.input-task').val();
    var taskComment = $('#' + taskId).find('.input-comment').val();
    saveTask(sectionId, taskId, taskName, taskComment);
});

function saveTask(sectionId, taskId, taskName, taskComment) {
    tabs.forEach(function (tab, index) {
        if (tabs[index].content === sectionId) {
            var b = tabs[index].taskList;
            b.forEach(function (task, index) {
                console.log(b);
                if (b[index].taskId === taskId) {
                    b[index].taskName = taskName;
                    b[index].taskComment = taskComment;
                    console.log('ok');
                }
            })
        }
    });
    $('#' + taskId).children().remove();
    $('#' + taskId).append('<span class="text-muted name-task">' + taskName + '</span><br><span class="text-muted comment-task">' + taskComment + '</span><button type="submit" class="btn btn-primary edit-task">edit</button><button type="submit" class="btn btn-primary done-task">done</button><button type="submit" class="btn btn-primary remove-task">remove</button>');
}

//done and remove

$('main').delegate('.done-task', 'click', function () {

});

$('main').delegate('.remove-task', 'click', function () {

});
