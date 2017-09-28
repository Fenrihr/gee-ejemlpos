/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = /* color: #ff0000 */ee.Geometry.Polygon(
        [[[8.413467407226562, 47.28155814229488],
          [8.613967895507812, 47.28202395793543],
          [8.61053466796875, 47.41043231312493],
          [8.413467407226562, 47.411826340096454]]]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// Chart a time-series.
function addNDVI(image) {
  return image.addBands(image.normalizedDifference(['B5', 'B4']))
}

var with_ndvi = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA")
      // Note the date changes.
      .filterDate('2015-01-01', '2016-01-01')
      .map(addNDVI)

var greenest = with_ndvi.qualityMosaic('nd')

print(ui.Chart.image.series({
  imageCollection: with_ndvi.select('nd'), 
  region: geometry, 
  reducer: ee.Reducer.mean()
}))