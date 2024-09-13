import React, { useEffect, useState } from "react";
import "@/index.css";
import { FileUpload } from "./ui/file-upload";
import { handleFile } from "@/functions/fileToObject";
import { MessageAnalyzer } from "@/functions/MessageAnalyzer ";
import { SparklesPreview } from "./Heading";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import Nav from "./Nav2";


const AnalyticsPage = () => {
  const [file, setFile] = useState(null);
  const [words, setWords] = useState([])
  const [chatNumber, setChatNumber] = useState([])
  const [report, setReport] = useState("hidden")

  const fileHandle = async (e) => {
    try {
      const data = await handleFile(e);
      setFile(data);
      setReport("display")
    } catch (error) {
      console.error("Error handling file:", error);
    }
  };


  useEffect(() => {
    if (file) {
      const analyzer = new MessageAnalyzer(file);
      const numberOfChat =  analyzer.countMessagesPerSender()
      const mostwords = analyzer.countMostFrequentWords()
      setWords(mostwords.slice(0, 100))
      setChatNumber(numberOfChat)
    }
  }, [file]);

  return (
    <section>
      <Nav/>
      <div className="grid-background" />
      <div className="flex justify-center mt-10">
        <div className="w-[80%] md:w-[40%] border-2 rounded-2xl border-dashed bg-[#010817b3]">
          <FileUpload onChange={fileHandle} />
        </div>
      </div>
      <div className={report}>
      <section className="font-inte">
      <SparklesPreview heading={"User Totla Chat"} />
          <div id="top" className="flex flex-col md:flex-row md:gap-0 gap-8 justify-around items-center max-w-[80%] mx-auto">
            <Card className="md:w-[40%] w-[90%]">
                  <CardHeader className="font-semibold font-inte text-lg md:text-3xl tracking-widest uppercase">
                    {Object.keys(chatNumber)[0]}
                  </CardHeader>
                  <CardContent>
                    <h1 className="font-semibold font-inte text-9xl ">
                    {Object.values(chatNumber)[0]}
                    </h1>
                  </CardContent>
            </Card>
            <Card className="md:w-[40%] w-[90%]">
                  <CardHeader className="font-semibold font-inte text-lg md:text-3xl tracking-widest uppercase">
                  {Object.keys(chatNumber)[1]}
                  </CardHeader>
                  <CardContent>
                    <h1 className="font-semibold font-inte text-9xl">
                    {Object.values(chatNumber)[1]}
                    </h1>
                  </CardContent>
            </Card>
          </div>
      <SparklesPreview heading={"Most Used Words"} />
      <div className="flex justify-center">
      <Card className="md:max-w-[80%] md:mx-0 w-full mx-4 mb-20">
        <CardContent className="md:max-w-[80%] w-full mx-auto">
      <Table className="font-inte">
        <TableCaption>Most Frequently used words in chat</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50%] text-center">Words</TableHead>
            <TableHead className="w-[50%] text-center">Number of Repeatation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {words.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-semibold font-pop text-center capitalize">{item[0]}</TableCell>
                <TableCell className="font-semibold font-inte text-center">{item[1]}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
        </CardContent>
      </Card>
      </div>
    </section>
      </div>
    </section>
  );
};

export default AnalyticsPage;