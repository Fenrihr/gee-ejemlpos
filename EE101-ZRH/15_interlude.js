// Greenest Pixel Composite
function addNDVI(image) {
  return image.addBands(image.normalizedDifference(['B5', 'B4']));
}

var with_ndvi = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA")
      .filterDate('2015-04-01', '2015-07-01')
      .map(addNDVI)

var greenest = with_ndvi.qualityMosaic('nd');
Map.addLayer(greenest, {max:0.3, bands:["B4", "B3", "B2"]}, 'RGB');