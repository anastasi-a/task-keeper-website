function Tab(item, content, active) {
    this.item = item;
    this.content = content;
    this.active = false;
}

function Tabs() {}
Tabs.prototype = [];

Tabs.prototype.activation = function (id) {
    tabs.forEach(function (item, num) {
        if (num.toString() === id) {
            tabs[num].active = true;
            document.getElementById(tabs[num].item).classList.add('active-tab');
            document.getElementById(tabs[num].content).classList.add('active-content');
        } else {
            tabs[num].active = false;
            document.getElementById(tabs[num].item).classList.remove('active-tab');
            document.getElementById(tabs[num].content).classList.remove('active-content');
        }
    });
    console.log(tabs);
}

var tab1 = new Tab('home', 'home-content', false);
var tab2 = new Tab('work', 'work-content', false);
var tab3 = new Tab('rest', 'rest-content', true);

var tabs = new Tabs();

tabs.push(tab1);
tabs.push(tab2);
tabs.push(tab3);

var point = document.querySelector('.tab-list');

point.addEventListener('click', function (event) {
    if (event.target.classList.contains('tab')) {
        var id = event.target.parentNode.getAttribute("tab-id");
        console.log(id);
        tabs.activation(id);
    }
});
