// Filter an image collection.
var collection = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA")
var filtered = collection.filterDate('2015-04-01', '2015-07-01');

Map.addLayer(filtered);