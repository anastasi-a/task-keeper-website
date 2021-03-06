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

$('#addTab').click(function () {
    var name = $('#inputTab').val();
    $('#inputTab').val('');
    if (tabs.length === 0) {
        item = 1;
    } else {
        item = parseInt($('.tab-list').find('li:last').attr('id'), 10) + 1;
    }
    var content = item + '-content';

    if (name.length === 0){
        $('.errorTab').css('display', 'block');
    } else {
        $('.errorTab').css('display', 'none');
        newTab(name, item, content);
    }
});

function newTab(name, item, content) {
    var tab = new Tab(name, item, content);
    tabs.push(tab);
    $('.tab-list').append('<li id="' + item + '" class="nav-item tab"><a class="nav-link" href="#">' + name + '</a><button type="submit" class="btn btn-primary remove-tab">remove</button> </li>');
    $('#allContentBlocks').append('<section id="' + content + '" class="row text-center placeholders content"><div class="col-6 col-sm-3 placeholder task"><div class="form-group new-tab-form"><span class="errorTask">Введите название задачи!</span> <input type="taskContent" class="form-control input-task" placeholder="New task"><textarea type="text" class="form-control input-comment" placeholder="Comment..."></textarea><button type="submit" class="btn btn-primary add-task">add</button> </div> </div></section>');
    saveToStorage(tabs);
}

$('.tab-list').delegate('.tab', "click", function () {
    var id = $('.tab').index(this);
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
    saveToStorage(tabs);
}

//edit tab
$('.tab-list').delegate('.tab', 'dblclick', function () {
    var item = '#' + $(this).attr('id');
    var name = $(item).find('a').html();
    editTab(item, name);
});

function editTab(item, name) {
    $(item).children().remove();
    $(item).append('<input type="text" class="form-control input-tab" value="' + name + '" placeholder=""><button type="submit" class="btn btn-primary save-tab">save</button></div>');
}

// save tab
$('.tab-list').delegate('.save-tab', 'click', function () {
    var tabId = $(this).closest('li').attr('id');
    var item = parseInt(tabId, 10);
    var name = $('#' + item).find('.input-tab').val();
    saveTab(item, name);
});

function saveTab(item, name) {
    tabs.forEach(function (tab, index) {
        if (tabs[index].item === item) {
            tabs[index].name = name;
        }
    });
    $('#' + item).children().remove();
    $('#' + item).append('<a class="nav-link" href="#">' + name + '</a><button type="submit" class="btn btn-primary remove-tab">remove</button>');
    saveToStorage(tabs);
}

//remove tab
$('.tab-list').delegate('.remove-tab', 'click', function (event) {
    var tabId = $(this).closest('li').attr('id');
    var item = parseInt(tabId, 10);
    removeTab(item);
    event.stopPropagation();
});

function removeTab(item) {
    tabs.forEach(function (tab, index) {
        if (tabs[index].item === item) {
            var num = tabs.indexOf(tabs[index]);
            var sectionId = tabs[index].content;
            $('#' + item).remove();
            tabs.splice(num, 1);
            $('#' + sectionId).remove();
        }
    });
    saveToStorage(tabs);
}

//create task
function Task(taskName, taskId, taskComment) {
    this.taskName = taskName;
    this.taskId = taskId;
    this.taskComment = taskComment;
    this.done = false;
}

//add new task
$('main').delegate('.add-task', 'click', function () {
    var sectionId = $(this).closest('section').attr('id');
    var sectionIdEl = '#' + sectionId;
    var taskName = $(sectionIdEl).find('.input-task').val();
    var taskId;
    var sectionNubmer = sectionId.split('-');
    if ($(sectionIdEl).find('.task:last').index() === 0) {
        taskId = sectionNubmer[0] + 'task-1';
    } else {
        var lastTask = $(sectionIdEl).find('.task:last').attr('id').split('-');
        taskId = sectionNubmer[0] + 'task-' + (parseInt(lastTask[1]) + 1);
    }
    // var taskId = 'task-' + ($('#' + sectionId).find('.task:last').index() + 1);
    var taskComment = $(sectionIdEl).find('.input-comment').val();
    $("input").val('');
    $("textarea").val('');

    if (taskName.length === 0){
        $('.errorTask').css('display', 'block');
    } else {
        $('.errorTask').css('display', 'none');
        newTask(sectionId, sectionIdEl, taskName, taskId, taskComment);
    }
});

function newTask(sectionId, sectionIdEl, taskName, taskId, taskComment) {
    var task = new Task(taskName, taskId, taskComment);
    tabs.forEach(function (tab, index) {
        if (tabs[index].content === sectionId) {
            tabs[index].taskList.push(task);
        }
    });
    $(sectionIdEl).append(' <div id="' + taskId + '" class="col-6 col-sm-3 placeholder task"><span class="text-muted name-task">' + taskName + '</span><br><span class="text-muted comment-task">' + taskComment + '</span><button type="submit" class="btn btn-primary edit-task">edit</button><button type="submit" class="btn btn-primary done-task">done</button><button type="submit" class="btn btn-primary remove-task">remove</button></div>');
    saveToStorage(tabs);
}

//edit task
$('main').delegate('.edit-task', 'click', function () {
    var taskId = '#' + $(this).closest('.task').attr('id');
    var taskName = $(taskId).find('.name-task').html();
    var taskComment = $(taskId).find('.comment-task').html();
    editTask(taskId, taskName, taskComment);
});

function editTask(taskId, taskName, taskComment) {
    $(taskId).children().remove();
    $(taskId).append('<div class="form-group new-tab-form"><input type="text" class="form-control input-task" placeholder="" value="' + taskName + '"><textarea type="text" class="form-control input-comment" placeholder="">' + taskComment + '</textarea><button type="submit" class="btn btn-primary save-task">save</button></div>');
}

// save task
$('main').delegate('.save-task', 'click', function () {
    var sectionId = $(this).closest('section').attr('id');
    var taskId = $(this).closest('.task').attr('id');
    var taskIdEl = '#' + taskId;
    var taskName = $(taskIdEl).find('.input-task').val();
    var taskComment = $(taskIdEl).find('.input-comment').val();
    saveTask(sectionId, taskId, taskIdEl, taskName, taskComment);
});

function saveTask(sectionId, taskId, taskIdEl, taskName, taskComment) {
    tabs.forEach(function (tab, index) {
        if (tabs[index].content === sectionId) {
            var list = tabs[index].taskList;
            list.forEach(function (task, index) {
                if (list[index].taskId === taskId) {
                    list[index].taskName = taskName;
                    list[index].taskComment = taskComment;
                }
            });
        }
    });
    $(taskIdEl).children().remove();
    $(taskIdEl).append('<span class="text-muted name-task">' + taskName + '</span><br><span class="text-muted comment-task">' + taskComment + '</span><button type="submit" class="btn btn-primary edit-task">edit</button><button type="submit" class="btn btn-primary done-task">done</button><button type="submit" class="btn btn-primary remove-task">remove</button>');
    saveToStorage(tabs);
}

//done task
$('main').delegate('.done-task', 'click', function () {
    var sectionId = $(this).closest('section').attr('id');
    var taskId = $(this).closest('.task').attr('id');
    var taskTag = '#' + taskId;
    var done;
    if ($(taskTag).hasClass('task-status')) {
        $(taskTag).removeClass('task-status');
        done = false;
    } else {
        $(taskTag).addClass('task-status');
        done = true;
    }
    doneTask(sectionId, taskId, done);
});

function doneTask(sectionId, taskId, done) {
    tabs.forEach(function (tab, index) {
        if (tabs[index].content === sectionId) {
            var list = tabs[index].taskList;
            list.forEach(function (task, index) {
                if (list[index].taskId === taskId) {
                    list[index].done = done;
                }
            });
        }
    });
    saveToStorage(tabs);
}

//remove task
$('main').delegate('.remove-task', 'click', function () {
    var sectionId = $(this).closest('section').attr('id');
    var taskId = $(this).closest('.task').attr('id');
    removeTask(sectionId, taskId);
});

function removeTask(sectionId, taskId) {
    tabs.forEach(function (tab, index) {
        if (tabs[index].content === sectionId) {
            var list = tabs[index].taskList;
            list.forEach(function (task, index) {
                if (list[index].taskId === taskId) {
                    var num = list.indexOf(list[index]);
                    $('#' + taskId).remove();
                    list.splice(num, 1);
                }
            });
        }
    });
    saveToStorage(tabs);
}

//local storage
function saveToStorage(obj) {
    var myObj = JSON.stringify(obj);
    localStorage.setItem("saveObg", myObj);
}

function fetchFromStorage() {
    var getObg = JSON.parse(localStorage.getItem("saveObg"));
    getObg.__proto__ = Tabs.prototype;
    getObg.forEach(function (tab, index) {
        var list = getObg[index].taskList;
        list.forEach(function (task) {
            if (task != undefined) {
                task.__proto__ = Task.prototype;
            }
        })
    });
    return getObg;
}

function fetchFromStorage() {
    var getObg = JSON.parse(localStorage.getItem("saveObg"));
    getObg.__proto__ = Tabs.prototype;
    getObg.forEach(function (tab, index) {
        var list = getObg[index].taskList;
        list.forEach(function (task, index) {
            task = new Task();
        })
    });
    return getObg;
}

var saved = fetchFromStorage();

if (saved) {
    tabs = saved;
}
else {
    tabs = new Tabs();
}

$(document).ready(function () {
    createHtmlElements(tabs)
});

function createHtmlElements(tabs) {
    tabs.forEach(function (tab, index) {
        var item = tabs[index].item;
        var name = tabs[index].name;
        var content = tabs[index].content;
        var active = tabs[index].active;
        $('.tab-list').append('<li id="' + item + '" class="nav-item tab"><a class="nav-link" href="#">' + name + '</a><button type="submit" class="btn btn-primary remove-tab">remove</button></li>');
        $('#allContentBlocks').append('<section id="' + content + '" class="row taskContent-center placeholders content"><div class="col-6 col-sm-3 placeholder task"><div class="form-group new-tab-form"><span class="errorTask">Введите название задачи!</span> <input type="taskContent" class="form-control input-task" placeholder="New task"><textarea type="text" class="form-control input-comment" placeholder="Comment..."></textarea><button type="submit" class="btn btn-primary add-task">add</button> </div> </div></section>');
        if (tabs[index].content === content) {
            var list = tabs[index].taskList;
            list.forEach(function (task, index) {
                if (task != undefined) {
                    var taskId = list[index].taskId;
                    var taskName = list[index].taskName;
                    var taskComment = list[index].taskComment;
                    var sectionId = '#' + content;
                    $(sectionId).append(' <div id="' + taskId + '" class="col-6 col-sm-3 placeholder task"><span class="text-muted name-task">' + taskName + '</span><br><span class="text-muted comment-task">' + taskComment + '</span><button type="submit" class="btn btn-primary edit-task">edit</button><button type="submit" class="btn btn-primary done-task">done</button><button type="submit" class="btn btn-primary remove-task">remove</button></div>');
                }
            });
        }
    });
    tabActivation(tabs);
}

function tabActivation() {
    tabs.forEach(function (item, num) {
        if (tabs[num].active === true) {
            $('#' + tabs[num].item).addClass('active-tab');
            $('#' + tabs[num].content).addClass('active-content');
            var list = tabs[num].taskList;
            list.forEach(function (task, index) {
                if (list[index].done === true) {
                    $('#' + list[index].taskId).addClass('task-status');
                }
            });
        }
    });
}