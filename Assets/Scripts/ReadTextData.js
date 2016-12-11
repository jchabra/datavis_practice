#pragma strict 

var theSourceFile : TextAsset;    // Variable to set which text file we're using
var marker : Transform;           // What 3D object will mark a data point's position?
var xColumn : float;              // Data column for X value
var yColumn : float;              // ... Y value
var zColumn : float;              // ... Z value
var labelColumn : float;          // Data column that will show up on mouseover


// Rescale data values to match a desired range of space
var xMinMax : Vector2 = Vector2(0,100);    //smallest / largest values of X in data set
var yMinMax : Vector2 = Vector2(0,100);    // ... Y values
var zMinMax : Vector2 = Vector2(0,100);    // ... Z values

var axesMinMax : Vector2 = Vector2(0,100); // smallest / largest virtual units for display area


function Start() {

  var myText = theSourceFile.text;              // read *all* text from file into one big string
  var myList = myText.Split("#"[0]);            // split the text into lines
  for (var i=1; i< myList.length; i++) {          // cycle through each line one at a time, skip first
    var dataList = myList[i].Split("\t"[0]);      // split each line into columns
    //for (var j=0; j<dataList.Length; j++) {   // cycle through and print each itme (for debugging)
      // print ( dataList[j]);
    // }
    // print (myList[i].ToString());
    if (dataList.Length > 1) {                          // only process lines with contents
      var x = parseFloat( dataList[xColumn] );          // read out X
      var y = parseFloat( dataList[yColumn] );          // read out Y
      var z = parseFloat( dataList[zColumn] );          // read out Z
      var myLabel : String = dataList[labelColumn];   	// read out label text

      //scale variables tof it the desired range of virtual space
      var xPct : float = (x-xMinMax[0]) / (xMinMax[1] - xMinMax[0]);          // value-min / range = %
      x = (xPct * (axesMinMax[1] - axesMinMax[0])) + axesMinMax[0];           // x * %, + min
      print(y); print(yMinMax[1] - yMinMax[0]);
      var yPct : float = (y-yMinMax[0]) / (yMinMax[1] - yMinMax[0]);          // value-min / range = %
      y = (yPct * (axesMinMax[1] - axesMinMax[0])) + axesMinMax[0];           // y * %, + min
      print (yPct);
      var zPct : float = (z-zMinMax[0]) / (zMinMax[1] - zMinMax[0]);          // value-min / range = %
      z = (zPct * (axesMinMax[1] - axesMinMax[0])) + axesMinMax[0];           // z * %, + min

      // Use Instantiate to make a copy of the 3D marker at the desired location
      var myMarker : Transform = Instantiate( marker, Vector3(x,y,z), Quaternion.identity);
      // Send a message to the marker's LabelItems script, calling the SetText function to set the label's text
      myMarker.SendMessage("SetText", myLabel, SendMessageOptions.DontRequireReceiver);
    } // end of if statement
  } // end of for loop
} // end of Start Function
