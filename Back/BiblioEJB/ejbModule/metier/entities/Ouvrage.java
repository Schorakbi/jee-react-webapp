package metier.entities;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Ouvrage")
public class Ouvrage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "TITRE")
    private String titre;

    @Column(name = "DATECREATION")
    private String dateDeCreation;

    @Column(name = "EXISTE")
    private boolean disponible = true;
    public String getTypeOuvrage() {
        return "Ouvrage";
    }
    public Ouvrage() {
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDateDeCreation() {
        return dateDeCreation;
    }

    public void setDateDeCreation(String dateDeCreation) {
        this.dateDeCreation = dateDeCreation;
    }

    public boolean isDisponible() {
        return disponible;
    }

    public void setDisponible(boolean disponible) {
        this.disponible = disponible;
    }

    public Ouvrage(String titre, String dateDeCreation, boolean disponible) {
        super();
        this.titre = titre;
        this.dateDeCreation = dateDeCreation;
        this.disponible = disponible;
    }

    public Ouvrage(String titre, String dateDeCreation) {
        this.titre = titre;
        this.dateDeCreation = dateDeCreation;
        this.disponible = true;
    }

    @Override
    public String toString() {
        return "Ouvrage{" +
                "id=" + id +
                ", titre='" + titre + '\'' +
                ", dateDeCreation='" + dateDeCreation + '\'' +
                ", disponible=" + disponible +
                '}';
    }

}
