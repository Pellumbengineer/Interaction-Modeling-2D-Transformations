# Interaction-Modeling-2D-Transformations

1. Objective
  There are three main objectives of this homework:
  
    i.  Building interactive applications
    
    ii. Modeling simple geometric objects
    
    iii.Implementing 2D transformations
    
    
## Modeling
  I modeled the geometry shown in Figure. It contains an ellipse centered at the origin and 4 square
  diamond shapes attached to the ellipse.    
  
  ![Screenshot from 2019-05-08 01-15-19](https://user-images.githubusercontent.com/26312757/57336641-44039d80-712f-11e9-96ab-693873c8b00b.png)

I modeled a circle/ellipse using triangle fans as shown in right-bottom, by varying θ values.

## Interaction

  Resolution: Theta angle (Figure 2 – right-bottom) to determine the resolution of the vertices in ellipse.
  
  X-radius: Radius of the ellipse in x direction.
  
  Y-radius: Radius of the ellipse in y direction.
  
  Color1: Pass the color obtained from sliders to the fragment shader to determine the color of the diamonds.
  
  Color2: Pass the color obtained from sliders to the fragment shader to determine the color of the ellipse.
  
  Position: Perform 2D translation according to X and Y slider values.
  
  Scale: Scale the size of the shapes according to the slider values.
  
  Rotation: Rotate the shapes in z-axis according to the slider values.
  
