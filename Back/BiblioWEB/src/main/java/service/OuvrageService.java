package service;

import metier.OuvrageLocal;
import metier.entities.Livre;
import metier.entities.Ouvrage;
import metier.entities.Video;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Stateless
@Path("/ouvrage")
public class OuvrageService {

    @EJB
    private OuvrageLocal metier;
    @POST
    @Path("/ajouterOuvrage")
    @Consumes(MediaType.APPLICATION_JSON)
    public void ajoutOuvrage(Ouvrage ouvrage) {
        metier.ajoutOuvrage(ouvrage);
    }
    @POST
    @Path("/ajouterLivre")
    @Consumes(MediaType.APPLICATION_JSON)
    public void ajoutLivre(Livre livre) {
        metier.ajoutLivre(livre);
    }
    @POST
    @Path("/ajouterVideo")
    @Consumes(MediaType.APPLICATION_JSON)
    public void ajoutVideo(Video video) {
        metier.ajoutVideo(video);
    }

    @DELETE
    @Path("/supprimer/{id}")
    public void suppOuvrage(@PathParam("id") Long id) {
        Ouvrage ouvrage = metier.rechercheOuvrage(id);
        if (ouvrage != null) {
            metier.suppOuvrage(ouvrage);
        }
    }

    @GET
    @Path("/rechercher/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Ouvrage rechercheOuvrage(@PathParam("id") Long id) {
        return metier.rechercheOuvrage(id);
    }

    @GET
    @Path("/liste")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Ouvrage> getAllOuvrages() {
        return metier.getAllOuvrage();
    }

    @PUT
    @Path("/updateOuvrage")
    @Consumes(MediaType.APPLICATION_JSON)
    public void updateOuvrage(Ouvrage ouvrage) {
        metier.updateOuvrage(ouvrage);
    }
    @PUT
    @Path("/updateLivre")
    @Consumes(MediaType.APPLICATION_JSON)
    public void updateOuvrage(Livre livre) {
        metier.updateOuvrage(livre);
    }
    @PUT
    @Path("/updateVideo")
    @Consumes(MediaType.APPLICATION_JSON)
    public void updateOuvrage(Video video) {
        metier.updateOuvrage(video);
    }
}
