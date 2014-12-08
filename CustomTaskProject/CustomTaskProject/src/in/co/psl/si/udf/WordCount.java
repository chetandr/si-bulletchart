package in.co.psl.si.udf;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * 
 * @author Reshma Godse
 */
public class WordCount implements ICustomTask {

	@Override
	public List<Object> process(String inputText, String param)
			throws IOException {
		List<Object> dataList = new ArrayList<Object>();
		if (inputText != null) {
			String[] words = inputText.split(" ");
			int wordCount = 0;
			for (String word : words) {
				if (param != null) {
					if (word.startsWith(param)) {
						wordCount++;
					}
				} else {
					wordCount++;
				}
			}
			dataList.add(String.valueOf(wordCount));
		}
		return dataList;
	}
}
