package metier;

import javax.ejb.Stateless;
import javax.persistence.PersistenceContext;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import metier.entities.Livre;
import metier.entities.Ouvrage;
import metier.entities.Video;

import java.util.List;

@Stateless(name = "Ouvrage")
public class OuvrageEJBImpl implements OuvrageLocal {

	@PersistenceContext(name = "bibliotheque")
    private EntityManager em;

    @Override
    public void ajoutOuvrage(Ouvrage ouvrage) {
        try {
            em.persist(ouvrage);
        } catch (Exception ex) {
            // Handle exceptions appropriately
            ex.printStackTrace();
        }
    }
    @Override
    public void ajoutLivre(Livre livre) {
    	try {
            em.persist(livre);
        } catch (Exception ex) {
            // Handle exceptions appropriately
            ex.printStackTrace();
        }
    }
    @Override
    public void ajoutVideo(Video video) {
    	try {
            em.persist(video);
        } catch (Exception ex) {
            // Handle exceptions appropriately
            ex.printStackTrace();
        }
    }

    @Override
    public void suppOuvrage(Ouvrage ouvrage) {
        try {
            if (ouvrage != null) {
                if (!em.contains(ouvrage)) {
                    ouvrage = em.merge(ouvrage);
                }
                em.remove(ouvrage);
            } else {
                System.out.println("L'ouvrage n'existe pas");
            }
        } catch (Exception ex) {
            System.out.println("Erreur : Il faut rendre l'ouvrage avant de le supprimer");
            // Handle exceptions appropriately
            ex.printStackTrace();
        }
    }

    @Override
    public Ouvrage rechercheOuvrage(Long id) {
        return em.find(Ouvrage.class, id);
    }

    @Override
    public void updateOuvrage(Ouvrage ouvrage) {
        try {
            Ouvrage existingOuvrage = em.find(Ouvrage.class, ouvrage.getId());
            if (existingOuvrage != null) {
                em.merge(ouvrage);
            } else {
                System.out.println("L'ouvrage n'existe pas");
            }
        } catch (Exception ex) {
            // Handle exceptions appropriately
            ex.printStackTrace();
        }
    }
    @Override
    public void updateLivre(Livre livre) {
        try {
            Ouvrage existingLivre = em.find(Ouvrage.class, livre.getId());
            if (existingLivre != null) {
                em.merge(livre);
            } else {
                System.out.println("Le Livre n'existe pas");
            }
        } catch (Exception ex) {
            // Handle exceptions appropriately
            ex.printStackTrace();
        }
    }
    @Override
    public void updateVideo(Video video) {
        try {
            Ouvrage existingLivre = em.find(Ouvrage.class, video.getId());
            if (existingLivre != null) {
                em.merge(video);
            } else {
                System.out.println("Le Livre n'existe pas");
            }
        } catch (Exception ex) {
            // Handle exceptions appropriately
            ex.printStackTrace();
        }
    }
    @Override
    public List<Ouvrage> getAllOuvrage() {
        TypedQuery<Ouvrage> query = em.createQuery("SELECT o FROM Ouvrage o", Ouvrage.class);
        return query.getResultList();
    }
}
