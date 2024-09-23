package metier.entities;


import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;


@Entity
@DiscriminatorValue("Livre")

public class Livre extends Ouvrage {
    private String auteur;

    public String getAuteur() {
        return auteur;
    }
    public void setAuteur(String auteur) {
        this.auteur = auteur;
    }
    public Livre() {
        super();
    }

    public Livre(String titre, String dateDeCreation, boolean disponible, String auteur) {
        super(titre, dateDeCreation, disponible);
        this.auteur = auteur;
    }

    public Livre(String titre, String dateDeCreation, String auteur) {
        super(titre, dateDeCreation, true);
        this.auteur = auteur;
    }
    public String getTypeOuvrage() {
        return "Livre";
    }
    @Override
    public String toString() {
        return "Livre{" +
                "titre='" + getTitre() + '\'' +
                ", dateDeCreation='" + getDateDeCreation() + '\'' +
                ", disponible=" + isDisponible() +
                ", auteur='" + auteur + '\'' +
                ", type=" + this.getTypeOuvrage()+
                '}';
    }
}
