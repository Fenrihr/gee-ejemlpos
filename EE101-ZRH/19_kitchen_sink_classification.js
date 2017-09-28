/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = /* color: #ff0000 */ee.Geometry.Polygon(
        [[[8.200607299804688, 47.105185994648316],
          [8.618087768554688, 47.109392144037884],
          [8.61053466796875, 47.41043231312493],
          [8.192367553710938, 47.41275567091137]]]),
    imageCollection = ee.ImageCollection("MODIS/051/MCD12Q1");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
function addNDVI(image) {
  return image.addBands(image.normalizedDifference(['B5', 'B4']))
}

var with_ndvi = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA")
      // Note the date changes.
      .filterDate('2013-01-01', '2014-01-01')
      .select('B[0-9]*')
      .map(addNDVI)

var greenest = with_ndvi.qualityMosaic('nd')

// Build a classifier using MODIS land cover for training.
var landcover = ee.Image("MODIS/051/MCD12Q1/2013_01_01").select(0).rename('landcover')
var training = greenest.addBands(landcover).stratifiedSample({
  numPoints: 500,
  classBand: "landcover",
  region: geometry, 
  scale: 30,
})
print(training.reduceColumns(ee.Reducer.frequencyHistogram(), ["landcover"]))

var classifier = ee.Classifier.randomForest(20).train(training, 'landcover')
var classified = greenest.classify(classifier)

var palette = [
  'aec3d4', // water
  '152106', '225129', '369b47', '30eb5b', '387242', // forest
  '6a2325', 'c3aa69', 'b76031', 'd9903d', '91af40',  // shrub, grass
  '111149', // wetlands
  'cdb33b', // croplands
  'cc0013', // urban
  '33280d', // crop mosaic
  'd7cdcc', // snow and ice
  'f7e084', // barren
  '6f6f6f'  // tundra
];

Map.addLayer(greenest, {max:0.3, bands:["B4", "B3", "B2"]}, 'RGB');
Map.addLayer(landcover, {min:0, max:17, palette: palette});
Map.addLayer(classified, {min:0, max:17, palette: palette});