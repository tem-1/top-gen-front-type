import java.util.Scanner;

public class OneTimePad {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        String alp[] = {
                "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u",
                "v", "w", "x", "y", "z"
        };
        String s1 = "";
        String s2 = "";
        String fistString = scan.next();
        String secondString = scan.next();
        String firstarr[] = fistString.split("");
        String secondarr[] = secondString.split("");
        for (int i = 0; i < firstarr.length; i++) {
            for (int j = 0; j < alp.length; j++) {
                if (firstarr[i].equals(alp[j])) {
                    s1 += String.valueOf(j) + "p";
                }
            }
        }
        for (int i = 0; i < secondarr.length; i++) {
            for (int j = 0; j < alp.length; j++) {
                if (secondarr[i].equals(alp[j])) {
                    s2 += String.valueOf(j) + "p";
                }
            }
        }
        String val = "";
        String converted1[] = s1.split("p");
        String converted2[] = s2.split("p");

        for (int i = 0; i < converted1.length; i++) {
            val += String.valueOf(Integer.parseInt(converted1[i]) + Integer.parseInt(converted2[i])) + "p";
        }
        String all[] = val.split("p");
        String realConsole = "";
        for (int i = 0; i < all.length; i++) {
            for (int j = 0; j < alp.length; j++) {
                // System.out.println("All i ==>: " + all[i]);
                if (Integer.parseInt(all[i]) > 25) {

                    if (Integer.parseInt(all[i]) - 25 == j) {
                        // System.out.print(alp[j]);
                        realConsole += alp[j];
                    }
                } else {
                    if (Integer.parseInt(all[i]) == j) {
                        // System.out.print(alp[j]);
                        realConsole += alp[j];
                    }
                }
            }
        }
        System.out.println("Hariu: ==>: " + realConsole);
        // System.out.println(val);
    }
}
