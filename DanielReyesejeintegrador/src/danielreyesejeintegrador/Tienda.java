/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package danielreyesejeintegrador;

import javax.swing.JOptionPane;
import java.util.Random;
/**
 *
 * @author Usuario
 */
public class Tienda {
private String[]productos;
private int[][] ventas;
private int n;

public Tienda(int n){
this.n = n;
productos = new String[n];
ventas = new int[7][n];

}

public void setProducto(int i, String nombre){
productos[i]=nombre;


}
   public String getProducto(int i){
   return productos[i];
   
   } 
   public void generarVentas(){
   Random r = new Random();
   for (int i=0; i<7; i++){
   for (int j=0; j< n; j++){
       ventas[i][j]= r.nextInt(10);
       
       
       
   }
   }
   
   
   }
   public void totalProductos(){
   String resultado ="";
   for (int j = 0; j <n; j++){
   int suma =0;
   for (int i=0; i<7; i++){
   suma += ventas[i][j];
   
   }
   
   resultado +=productos[j]+ ": " + suma +"\n"; 
   
   }
   JOptionPane.showMessageDialog(null,"total por producto:\n"+resultado);
   
   
   }
   
   
   public void diaMayorVentas(){
   
   String[] dias = {"lunes", "martes","miercoles", "jueves", "sabado"+"domingo"};
   int mayor=0;
   int pos =0;
   
   for (int i=0; i<7; i++){
   int suma=0;
   for(int j =0; j<n; j++){
   suma += ventas[i][j];
   
   }
   if (suma > mayor){
   mayor = suma;
   pos=i;
   
   
   }
   
   
   }
   JOptionPane.showMessageDialog(null,"dias con mas ventas: "+ dias[pos]+" = "+mayor);
   
   
   }
public  void productoMasVendido(){
int mayor =0;
int pos = 0;
for (int j=0; j<n; j++){
int suma=0;
for (int i=0; i< 7; i++){
suma += ventas[i][j];

}
if(suma >mayor){
mayor = suma;
pos = j;

}


}

JOptionPane.showMessageDialog(null,"producto mas vendido: "+ productos[pos]+" = "+ mayor);
}
}
