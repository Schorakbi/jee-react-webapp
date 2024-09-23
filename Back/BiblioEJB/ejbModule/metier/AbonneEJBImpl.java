package metier;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import metier.entities.Abonne;
import metier.entities.BiblioException;
import metier.entities.Ouvrage;
import javax.persistence.EntityManager;

@Stateless(name = "Abonne")
public class AbonneEJBImpl implements AbonneLocal {

	@PersistenceContext(name = "bibliotheque")
    private EntityManager em;

    @Override
    public void ajoutAbonne(Abonne abonne) {
        try {
            em.persist(abonne);
        } catch (Exception ex) {
            // Handle exceptions appropriately
            ex.printStackTrace();
        }
    }

    @Override
    public List<Abonne> getAllAbonne() {
        TypedQuery<Abonne> query = em.createQuery("SELECT a FROM Abonne a", Abonne.class);
        return query.getResultList();
    }

    @Override
    public void suppAbonne(Abonne abonne) {
        try {
            if (abonne != null) {
                if (!em.contains(abonne)) {
                    abonne = em.merge(abonne);
                }
                em.remove(abonne);
            } else {
                System.out.println("L'abonné n'existe pas");
            }
        } catch (Exception ex) {
            // Handle exceptions appropriately
            ex.printStackTrace();
        }
    }

    @Override
    public Abonne rechercheAbonne(Long numeroAbonnement) {
        return em.find(Abonne.class, numeroAbonnement);
    }

    @Override
    public void updateAbonne(Abonne abonne) {
        try {
            Abonne existingAbonne = em.find(Abonne.class, abonne.getNumeroAbonnement());
            if (existingAbonne != null) {
                em.merge(abonne);
            } else {
                System.out.println("L'abonné n'existe pas");
            }
        } catch (Exception ex) {
            // Handle exceptions appropriately
            ex.printStackTrace();
        }
    }

    @Override
    public void emprunter(Long id, Long numeroAbonnement) throws BiblioException {
        try {
            Abonne abonne = em.find(Abonne.class, numeroAbonnement);

            if (abonne == null) {
                throw new BiblioException("L'abonné n'existe pas");
            }

            Ouvrage ouvrage = em.find(Ouvrage.class, id);

            if (ouvrage == null) {
                throw new BiblioException("L'Ouvrage n'existe pas");
            }

            if (ouvrage.isDisponible()) {
                if (abonne.getOuvragePris() == null) {
                    abonne.setOuvragePris(ouvrage);
                    ouvrage.setDisponible(false);

                    em.merge(abonne);
                    em.merge(ouvrage);
                } else {
                    throw new BiblioException("Emprunt impossible : l'abonné possède déjà un ouvrage");
                }
            } else {
                throw new BiblioException("L'ouvrage n'est pas disponible");
            }
        } catch (Exception ex) {
            // Handle exceptions appropriately
            ex.printStackTrace();
            throw new BiblioException("Erreur lors de l'emprunt");
        }
    }

    @Override
    public void rendre(Long numeroAbonnement) throws BiblioException {
        try {
            Abonne abonne = em.find(Abonne.class, numeroAbonnement);

            if (abonne == null) {
                throw new BiblioException("L'abonné n'existe pas");
            }

            Ouvrage ouvrage = abonne.getOuvragePris();

            if (ouvrage == null) {
                throw new BiblioException("L'abonné n'a aucun ouvrage à rendre");
            }

            abonne.setOuvragePris(null);
            ouvrage.setDisponible(true);

            em.merge(abonne);
            em.merge(ouvrage);
        } catch (Exception ex) {
            // Handle exceptions appropriately
            ex.printStackTrace();
            throw new BiblioException("Erreur lors du rendu");
        }
    }
}
