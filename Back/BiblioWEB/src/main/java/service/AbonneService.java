package service;

import metier.AbonneLocal;
import metier.entities.Abonne;
import metier.entities.BiblioException;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Stateless
@Path("/abonne")
public class AbonneService {

    @EJB
    private AbonneLocal metier;

    @POST
    @Path("/ajouter")
    @Consumes(MediaType.APPLICATION_JSON)
    public void ajoutAbonne(Abonne abonne) {
        metier.ajoutAbonne(abonne);
    }

    @DELETE
    @Path("/supprimer/{numeroAbonnement}")
    public void suppAbonne(@PathParam("numeroAbonnement") Long numeroAbonnement) {
        Abonne abonne = metier.rechercheAbonne(numeroAbonnement);
        if (abonne != null) {
            metier.suppAbonne(abonne);
        }
    }

    @GET
    @Path("/rechercher/{numeroAbonnement}")
    @Produces(MediaType.APPLICATION_JSON)
    public Abonne rechercheAbonne(@PathParam("numeroAbonnement") Long numeroAbonnement) {
        return metier.rechercheAbonne(numeroAbonnement);
    }

    @GET
    @Path("/liste")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Abonne> getAllAbonnes() {
        return metier.getAllAbonne();
    }

    @PUT
    @Path("/update")
    @Consumes(MediaType.APPLICATION_JSON)
    public void updateAbonne(Abonne abonne) {
        metier.updateAbonne(abonne);
    }

    @PUT
    @Path("/emprunter/{id}/{numeroAbonnement}")
    public void emprunter(@PathParam("id") Long id, @PathParam("numeroAbonnement") Long numeroAbonnement) throws BiblioException {
        metier.emprunter(id,numeroAbonnement);
    }

    @PUT
    @Path("/rendre/{numeroAbonnement}")
    public void rendre(@PathParam("numeroAbonnement") Long numeroAbonnement) throws BiblioException {
        metier.rendre(numeroAbonnement);
    }
}
