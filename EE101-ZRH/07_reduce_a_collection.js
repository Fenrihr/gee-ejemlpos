// Reduce an image collection.
var collection = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA")
var filtered = collection.filterDate('2015-04-01', '2015-07-01');
var reduced = filtered.median();

Map.addLayer(reduced, {min:0, max:0.3, bands:['B4','B3','B2']}, 'RGB');
