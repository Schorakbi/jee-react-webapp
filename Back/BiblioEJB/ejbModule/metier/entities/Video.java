package metier.entities;



import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;


@Entity
@DiscriminatorValue("Video")
public class Video extends Ouvrage {
	private String editeur;
	private double duree;
	public String getEditeur() {
		return editeur;
	}
	public void setEditeur(String editeur) {
		this.editeur = editeur;
	}
	public double getDuree() {
		return duree;
	}
	public void setDuree(double duree) {
		this.duree = duree;
	}
	public Video() {
        super();
    }
	public Video(String titre,String dateDeCreation,String editeur,double duree){
		super(titre,dateDeCreation,true);
		this.editeur = editeur;
		this.duree=duree;
	}
	@Override
	public String getTypeOuvrage() {
	    return "Video";
	}
	@Override
    public String toString() {
        return "Video{" +
                "titre='" + getTitre() + '\'' +
                ", dateDeCreation='" + getDateDeCreation() + '\'' +
                ", disponible=" + isDisponible() +
                ", editeur='" + editeur + '\'' +
                ", duree=" + duree +
                ", type=" + this.getTypeOuvrage()+
                '}';
    }
}

