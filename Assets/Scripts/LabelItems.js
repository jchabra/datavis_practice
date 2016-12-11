#pragma strict 

// Options for Mouseover text label
// (NOTE: internal variables don't show up Unity editor)
var textMeshPrefab : TextMesh;  //We need a TextMesh (3D text object) to instantiate
internal var myLabel : TextMesh;  // This will be the name of the instantiated text
internal var myText : String = "Hello"; //This is the text that will be displayed

// Other Visual feedback on Mouseover
var scaleChange : float = 0.5;  // Increase size of marker on Mouseover
var rotationSpeed : float = 120; // Rotate marker on Mouseover
var highlightColor : Vector4 = Vector4(1, .8, .8, 1); //Change RGBA color on Mouseover

//By finding the Main Camera, we can make the text always point at it to be readable
internal var target : Transform; // make a Transform variable...
target = GameObject.Find("Main Camera").transform; // ...andassing the main camera to it 

//Variables to keep track of old color / scale / orientation, etc.
//    ...so we can reset them when the mousover extends
var oldColor : Color;
internal var oldOri : Vector3;

// OnMouseEnter events are triggered ONCE, when mouse enters object
function OnMouseEnter() {
  // Use Instantiate to make a new 3D text object
  myLabel = Instantiate(textMeshPrefab, Vector3(transform.position.x+1,transform.position.y+1,transform.position.z+1), Quaternion.identity);
  myLabel.text = myText;  // change the text of the message
  myLabel.transform.LookAt(target);  // Rotate the text to look at the camera
  myLabel.transform.Rotate(Vector3(0,180,0)); // Oops, it was backwards, flip it 180 degrees

  // Add some additional visual feedback for the user
  gameObject.transform.localScale += Vector3(scaleChange, scaleChange, scaleChange); //Make the object bigger temp
  oldColor = transform.GetComponent.<Renderer>().material.GetColor(" Color"); // Make a note of the original color
  transform.GetComponent.<Renderer>().material.color = Vector4(1, .8,.8,1); // ...then change the color temporarily
  // transform.renderer.material.color = Color.white; // this is an alternate way to change the color
  oldOri = transform.eulerAngles; // Make a note of the original orientation

}

// OnMouseOver events are triggered repeatedly, EVERY FRAME, until mouse leaves
function OnMouseOver() {
  // More visual feedback for the user
  transform.Rotate(Vector3(0, rotationSpeed*Time.deltaTime, 0)); //Make the 3D marker spin

}

// OnMouseExit events are triggered ONCE, when mouse leaves object
function OnMouseExit() {
  // When the mouse is no longer hovering over the object, we need to reset it
  Destroy(myLabel); //Delete the label when the mouse leaves
  // Reset the scale to its original value by subtracting the scale change
  gameObject.transform.localScale -= Vector3(scaleChange, scaleChange, scaleChange);
  transform.GetComponent.<Renderer>().material.color = oldColor; // Reset the material color
  transform.eulerAngles = oldOri; //Reset the object's orientation

}

// Other scripts can call this function to change the label text as needed 
function SetText( txt : String ) {
  myText = txt;
}




