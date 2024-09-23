package metier;

import java.util.List;

import javax.ejb.Local;

import metier.entities.Livre;
import metier.entities.Ouvrage;
import metier.entities.Video;

@Local
public interface OuvrageLocal {
	public void ajoutOuvrage(Ouvrage ouvrage);
	public void ajoutLivre(Livre livre);
	public void ajoutVideo(Video video);
	public void suppOuvrage(Ouvrage ouvrage);
	public Ouvrage rechercheOuvrage(Long id);
	public void updateOuvrage(Ouvrage ouvrage);
	public void updateLivre(Livre livre);
	public void updateVideo(Video video);
	List <Ouvrage> getAllOuvrage();
	
}
