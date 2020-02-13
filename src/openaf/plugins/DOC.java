package openaf.plugins;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigInteger;

import javax.xml.bind.annotation.adapters.HexBinaryAdapter;

import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;
import org.apache.poi.xwpf.usermodel.XWPFStyle;
import org.apache.poi.xwpf.usermodel.XWPFStyles;
import org.mozilla.javascript.ScriptableObject;
import org.mozilla.javascript.annotations.JSConstructor;
import org.mozilla.javascript.annotations.JSFunction;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTFonts;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTColor;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTDecimalNumber;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTHpsMeasure;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTOnOff;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTPPr;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTRPr;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTString;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTStyle;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.STStyleType;

/**
 * DOC plugin
 * 
 * @author Nuno Aguiar
 * 
 */
public class DOC extends ScriptableObject {
    private static final long serialVersionUID = -9058684071530344846L;
    protected boolean read_only;
    protected File aFile;
    protected XWPFDocument doc;
    protected Object istream;

    @Override
    public String getClassName() {
        return "DOC";
    }

    @JSConstructor
    public void newDOC(Object arg, String password, boolean readOnly) throws IOException {
        doc = null;

        if (arg instanceof String) {
            // It's a filename
            try {
                this.read_only = readOnly;
                this.aFile = new File((String) arg);
                if (readOnly) {
                    // doc = DocumentFactory.create(new FileInputStream(new File((String) arg)),
                    // password);
                    istream = new FileInputStream(new File((String) arg));
                    doc = new XWPFDocument((InputStream) istream);
                } else {
                    istream = new FileInputStream(new File((String) arg));
                    doc = new XWPFDocument((InputStream) istream);
                }
            } catch (Exception e) {

            }
        }

        if (arg instanceof byte[]) {
            try {

            } catch (Exception e) {
                istream = new ByteArrayInputStream((byte[]) arg);
                doc = new XWPFDocument((InputStream) istream);
            }
        }

        if (doc == null) {
            doc = new XWPFDocument();
        }
    }

    @JSFunction
    public void close() throws IOException {
        doc.close();
        //((InputStream) istream).close();
    }

    @JSFunction
    public XWPFDocument getDocument() {
        return doc;
    }

    @JSFunction
    public Object[] getParagraphs() {
        return doc.getParagraphs().toArray();
    }

    @JSFunction
    public void writeParagraph(String aString, String style) {
        XWPFParagraph para = doc.createParagraph();
        if (style != null && !style.equals("undefined")) {
            para.setStyle(style);
        }

        XWPFRun run = para.createRun();
        run.setText(aString);
    }

    @JSFunction
    public void writeFile(Object file) throws FileNotFoundException, IOException {
        FileOutputStream out = new FileOutputStream((String) file);
        doc.write(out);
        out.close();
    }

    //doc.getDocument().getProperties().getCoreProperties().getCreator()
    protected byte[] hexToBytes(String hexString) {
        HexBinaryAdapter adapter = new HexBinaryAdapter();
        byte[] bytes = adapter.unmarshal(hexString);
        return bytes;
    }

    @JSFunction
    public void addCustomHeadings() {
        XWPFStyles styles = doc.createStyles();

        this.addCustomHeadingStyle(styles, "Heading1", 1, 32, "2E74B5", "+Headings", false, false);
        this.addCustomHeadingStyle(styles, "Heading2", 2, 26, "2E74B5", "+Headings", false, false);
        this.addCustomHeadingStyle(styles, "Heading3", 3, 24, "1F4D78", "+Headings", false, false);
        this.addCustomHeadingStyle(styles, "Heading4", 4, 22, "2E74B5", "+Headings", true, false);
        this.addCustomHeadingStyle(styles, "Heading5", 5, 22, "2E74B5", "+Headings", false, false);
    }

    @JSFunction
    public void addCustomHeadingStyle(Object styles, String strStyleId, int headingLevel, int pointSize, String hexColor, String font, boolean isItalic, boolean isBold) {
        CTStyle ctStyle = CTStyle.Factory.newInstance();
        ctStyle.setStyleId(strStyleId);    
    
        CTString styleName = CTString.Factory.newInstance();
        styleName.setVal(strStyleId);
        ctStyle.setName(styleName);
    
        CTDecimalNumber indentNumber = CTDecimalNumber.Factory.newInstance();
        indentNumber.setVal(BigInteger.valueOf(headingLevel));
    
        ctStyle.setUiPriority(indentNumber);
    
        CTOnOff onoffnull = CTOnOff.Factory.newInstance();
        ctStyle.setUnhideWhenUsed(onoffnull);
        ctStyle.setQFormat(onoffnull);
    
        // style defines a heading of the given level
        CTPPr ppr = CTPPr.Factory.newInstance();
        ppr.setOutlineLvl(indentNumber);
        ctStyle.setPPr(ppr);
    
        XWPFStyle style = new XWPFStyle(ctStyle);
    
        CTHpsMeasure size = CTHpsMeasure.Factory.newInstance();
        size.setVal(new BigInteger(String.valueOf(pointSize)));
        CTHpsMeasure size2 = CTHpsMeasure.Factory.newInstance();
        size2.setVal(new BigInteger("24"));
    
        CTFonts fonts = CTFonts.Factory.newInstance();
        fonts.setAscii(font);
    
        CTRPr rpr = CTRPr.Factory.newInstance();
        rpr.setRFonts(fonts);
        rpr.setSz(size);
        rpr.setSzCs(size2);
        if (isItalic) rpr.setI(onoffnull);
        if (isBold) rpr.setB(onoffnull);
    
        CTColor color=CTColor.Factory.newInstance();
        color.setVal(hexColor);
        rpr.setColor(color);
        style.getCTStyle().setRPr(rpr);
    
        style.setType(STStyleType.PARAGRAPH);
        ((XWPFStyles) styles).addStyle(style);
    }
}