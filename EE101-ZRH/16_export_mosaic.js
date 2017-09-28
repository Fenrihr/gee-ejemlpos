/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = /* color: #ff0000 */ee.Geometry.Polygon(
        [[[8.413467407226562, 47.28155814229488],
          [8.613967895507812, 47.28202395793543],
          [8.61053466796875, 47.41043231312493],
          [8.413467407226562, 47.411826340096454]]]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// Exporting the greenest pixel mosaic.
function addNDVI(image) {
  return image.addBands(image.normalizedDifference(['B5', 'B4']));
}

var with_ndvi = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA")
      .filterDate('2015-04-01', '2015-07-01')
      .map(addNDVI)

var greenest = with_ndvi.qualityMosaic('nd');
Map.addLayer(greenest, {max:0.3, bands:["B4", "B3", "B2"]}, 'RGB');

Export.image.toDrive({
  image: greenest.select(['nd']),
  description: 'GreenestPixel',
  region: geometry,
  scale: 100
});