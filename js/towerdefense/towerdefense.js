function MapLoader() {

}

MapLoader.prototype.load = function(map) {
    /*$.ajax({
        url: 'maps/' + map
    }).done(function(data) {
        MapLoader.complete(data);
    });*/
};

MapLoader.prototype.complete = function(data) {
    console.log(data);
};

var mapLoader = new MapLoader();