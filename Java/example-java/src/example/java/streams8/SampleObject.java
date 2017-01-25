package example.java.streams8;


import java.util.ArrayList;
import java.util.List;

public class SampleObject {
	private String ola = null;
	
	private Integer mater = null;
	
	private List<Integer> ints = new ArrayList<Integer>();

	public String getOla() {
		return ola;
	}

	public void setOla(String ola) {
		this.ola = ola;
	}

	public Integer getMater() {
		return mater;
	}

	public void setMater(Integer mater) {
		this.mater = mater;
	}
	
	public SampleObject(){
		
	}

	public SampleObject(String ola, Integer mater) {
		super();
		this.ola = ola;
		this.mater = mater;
	}
	
	public SampleObject(String ola, Integer mater, List<Integer> ints) {
		super();
		this.ola = ola;
		this.mater = mater;
		this.ints = ints;
	}

	/**
	 * @return the ints
	 */
	public List<Integer> getInts() {
		return ints;
	}

	/**
	 * @param ints the ints to set
	 */
	public void setInts(List<Integer> ints) {
		this.ints = ints;
	}

	@Override
	public String toString() {
		return String.format("Martelo [ola=%s, mater=%s, ints=%s]", ola, mater,
				ints);
	}


}