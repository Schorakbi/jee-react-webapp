package metier.entities;




import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="ABONNE")
public class Abonne {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="NUMABONNE")
	private Long  numeroAbonnement;
	
	
	@Column(name="IDENTITE")
	private int numeroIdentite ;
	
	
	@Column(name="NOM")
	private String nom;
	@OneToOne
	@JoinColumn(name="OUV_EMPR")
	
	private Ouvrage ouvragePris;
	public int getNumeroIdentite() {
		return numeroIdentite;
	}
	public void setNumeroIdentite(int numeroIdentite) {
		this.numeroIdentite = numeroIdentite;
	}
	public String getNom() {
		return nom;
	}
	
    
    
	public void setNom(String nom) {
		this.nom = nom;
	}
	public Long getNumeroAbonnement() {
		return numeroAbonnement;
	}
	public void setNumeroAbonnement(Long numeroAbonnement) {
		this.numeroAbonnement = numeroAbonnement;
	}
	public Ouvrage getOuvragePris() {
		return ouvragePris;
	}
	public void setOuvragePris(Ouvrage ouvragePris) {
		this.ouvragePris = ouvragePris;
	}
	public Abonne() {
		super();
	}
	public Abonne (int numeroIdentite, int numeroAbonnement,String nom,Ouvrage ouvragePris) {
		super();
		this.numeroIdentite = numeroIdentite;
		this.nom = nom;
		this.ouvragePris=ouvragePris;
	}
	public Abonne(String nom,int numeroIdentite) {
		this.nom = nom;
		this.numeroIdentite = numeroIdentite;
	}
	@Override
	public String toString() {
	    return "Abonne{" +
	            "numeroIdentite=" + numeroIdentite +
	            ", numeroAbonnement=" + numeroAbonnement +
	            ", nom='" + nom + '\'' +
	            ", ouvragePris=" + (ouvragePris != null ? ouvragePris.getTitre() : "null") +
	            '}';
	}
}
