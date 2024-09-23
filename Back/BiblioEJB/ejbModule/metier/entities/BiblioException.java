package metier.entities;

public class BiblioException extends Exception {
	private static final long serialVersionUID = 1L;
    public BiblioException() {
        super();
    }

    public BiblioException(String message) {
        super(message);
    }

    public BiblioException(String message, Throwable cause) {
        super(message, cause);
    }

    public BiblioException(Throwable cause) {
        super(cause);
    }
}