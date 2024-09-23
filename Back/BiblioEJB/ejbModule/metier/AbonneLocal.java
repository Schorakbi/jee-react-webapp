package metier;

import java.util.List;

import javax.ejb.Local;
import metier.entities.*;

@Local
public interface AbonneLocal {
	public void ajoutAbonne(Abonne abonne);
	public void suppAbonne(Abonne abonne);
	public Abonne rechercheAbonne(Long numeroAbonnement);
	List <Abonne> getAllAbonne();
	public void updateAbonne(Abonne abonne);
	public void emprunter(Long id,Long numeroAbonnement) throws BiblioException;
	public void rendre(Long numeroAbonnement) throws BiblioException;
}
