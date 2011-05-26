<?php
error_reporting(E_ALL);
include ('../packer/class.JavaScriptPacker.php');
$lista = Array("src/jsts.js","src/jsts/geom.js","src/jsts/geom/Coordinate.js","src/jsts/planargraph.js","src/jsts/geomgraph.js","src/jsts/index.js","src/jsts/operation.js","src/jsts/triangulate.js","src/jsts/algorithm.js","src/jsts/io.js","src/jsts/Hashtable.js","src/jsts/index/index.js","src/jsts/planargraph/PlanarGraph.js","src/jsts/geomgraph/NodeMap.js","src/jsts/geomgraph/PlanarGraph.js","src/jsts/geomgraph/GeometryGraph.js","src/jsts/algorithm/CGAlgorithms.js","src/jsts/algorithm/LineIntersector.js","src/jsts/algorithm/CentroidArea.js","src/jsts/algorithm/HCoordinate.js","src/jsts/algorithm/Angle.js","src/jsts/algorithm/RayCrossingCounter.js","src/jsts/algorithm/BoundaryNodeRule.js","src/jsts/algorithm/RobustDeterminant.js","src/jsts/algorithm/CentroidLine.js","src/jsts/algorithm/CentralEndpointIntersector.js","src/jsts/algorithm/locate/PointOnGeometryLocator.js","src/jsts/algorithm/CentroidPoint.js","src/jsts/algorithm/RobustLineIntersector.js","src/jsts/algorithm/PointLocator.js","src/jsts/index/quadtree.js","src/jsts/index/quadtree/Quadtree.js","src/jsts/index/quadtree/NodeBase.js","src/jsts/index/quadtree/Node.js","src/jsts/index/quadtree/Key.js","src/jsts/index/quadtree/Root.js","src/jsts/index/ArrayListVisitor.js","src/jsts/index/kdtree.js","src/jsts/index/DoubleBits.js","src/jsts/index/IntervalSize.js","src/jsts/index/kdtree/KdTree.js","src/jsts/index/kdtree/KdNode.js","src/jsts/io/WKTWriter.js","src/jsts/io/WKTReader.js","src/jsts/geom/Location.js","src/jsts/geom/Polygon.js","src/jsts/geom/util.js","src/jsts/geom/Point.js","src/jsts/geom/Envelope.js","src/jsts/geom/LineString.js","src/jsts/geom/MultiPoint.js","src/jsts/geom/Triangle.js","src/jsts/geom/GeometryComponentFilter.js","src/jsts/geom/Dimension.js","src/jsts/geom/CoordinateList.js","src/jsts/geom/GeometryFilter.js","src/jsts/geom/MultiLineString.js","src/jsts/geom/LineSegment.js","src/jsts/geom/IntersectionMatrix.js","src/jsts/geom/util/LinearComponentExtracter.js","src/jsts/geom/util/PolygonExtracter.js","src/jsts/geom/util/PointExtracter.js","src/jsts/geom/LinearRing.js","src/jsts/geom/MultiPolygon.js","src/jsts/geom/Geometry.js","src/jsts/geom/PrecisionModel.js","src/jsts/geom/CoordinateArrays.js","src/jsts/geom/GeometryFactory.js","src/jsts/geom/GeometryCollection.js","src/jsts/operation/distance.js","src/jsts/operation/GeometryGraphOperation.js","src/jsts/operation/distance/DistanceOp.js","src/jsts/operation/distance/ConnectedElementLocationFilter.js","src/jsts/operation/distance/GeometryLocation.js","src/jsts/operation/valid.js","src/jsts/operation/relate.js","src/jsts/operation/buffer.js","src/jsts/operation/relate/RelateOp.js","src/jsts/operation/buffer/BufferParameters.js","src/jsts/operation/buffer/BufferOp.js","src/jsts/operation/buffer/BufferBuilder.js","src/jsts/operation/IsSimpleOp.js","src/jsts/operation/valid/IsValidOp.js","src/jsts/triangulate/DelauneyTriangulationBuilder.js","src/jsts/triangulate/quadedge.js","src/jsts/triangulate/quadedge/Vertex.js","src/jsts/triangulate/quadedge/TrianglePredicate.js","src/jsts/HashSet.js","src/jsts/geomgraph/index.js","src/jsts/geomgraph/Quadrant.js","src/jsts/geomgraph/EdgeIntersectionList.js","src/jsts/geomgraph/EdgeIntersection.js","src/jsts/geomgraph/GraphComponent.js","src/jsts/geomgraph/Node.js","src/jsts/geomgraph/Edge.js","src/jsts/geomgraph/Position.js","src/jsts/geomgraph/Label.js","src/jsts/geomgraph/EdgeEndStar.js","src/jsts/geomgraph/EdgeEnd.js","src/jsts/geomgraph/TopologyLocation.js","src/jsts/geomgraph/index/SegmentIntersector.js","src/jsts/geomgraph/index/EdgeSetIntersector.js","src/jsts/geomgraph/index/SimpleEdgeSetIntersector.js","src/jsts/geomgraph/index/SimpleMCSweepLineIntersector.js");
$buffer = "";
foreach($lista as $arq){
	if(file_exists("tempjs/temp.js"))
	{unlink("tempjs/temp.js");}
	packer($arq,"tempjs/temp.js","Normal");
	$abre = fopen("tempjs/temp.js", "r");
//$abre = fopen($arq, "r");
	while (!feof($abre))
	{$buffer .= fgets($abre);}
	fclose($abre);
	$buffer .= "\n";
}
if(file_exists("jstsi3geo.js"))
{unlink("jstsi3geo.js");}
$abre = fopen("jstsi3geo.js", "wt");
$escreve = fwrite ($abre,$buffer);
$fecha = fclose ($abre);
chmod("jstsi3geo.js",0777);
function packer($src,$out,$tipo="None")
{
	$script = file_get_contents($src);
	$script = str_replace("if(typeof(console)","//if(typeof(console)",$script);
	$t1 = microtime(true);
	$packer = new JavaScriptPacker($script, 0, true, false);
	$packed = $packer->pack();
	$t2 = microtime(true);
	$time = sprintf('%.4f', ($t2 - $t1) );
	echo 'script ', $src, ' packed in ' , $out, ', in ', $time, ' s.', "\n<br>";
	file_put_contents($out, $packed);
	chmod($out,0777);
}

?>