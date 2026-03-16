/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package danielreyesejeintegrador;

import javax.swing.JOptionPane;

/**
 *
 * @author Usuario
 */
public class main {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // TODO code application logic here
 int n = Integer.parseInt(JOptionPane.showInputDialog("cantidad de productos: "));
 
Tienda tienda = new Tienda(n);
for (int i=0; i <n; i++){
String nombre = JOptionPane.showInputDialog("nombre el producto" + (i+1));

tienda.setProducto(i, nombre);


}
tienda.generarVentas();
tienda.totalProductos();
tienda.diaMayorVentas();
tienda.productoMasVendido();

    }

}
