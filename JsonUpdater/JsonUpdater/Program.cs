﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Xml;
using System.Xml.XPath;

namespace JsonUpdater
{
    class Program
    {
        static List<gauge> gauges = new List<gauge>();
        static void Main(string[] args)
        {
            read();
            Console.ReadLine();
            update(); 
            output();          
            Console.WriteLine("Done");
            Console.ReadLine();
        }

        private static void update()
        {
             XmlDocument doc = new XmlDocument();
           
             for (int i = 0; i < gauges.Count; i++)
             {
                 try
                 {
                     doc.Load("http://maps.googleapis.com/maps/api/geocode/xml?address=" + gauges[i].Town + "&sensor=false");
                     XmlNode element = doc.SelectSingleNode("//GeocodeResponse/status");
                     if (element.InnerText == "ZERO_RESULTS")
                     {
                         //return ("No data available for the specified location");
                         Console.WriteLine("zero");
                     }
                     else
                     {
                         element = doc.SelectSingleNode("//GeocodeResponse/result/geometry/location");
                         gauges[i].loc = element.InnerText;

                     }
                 }
                 catch(Exception ex)
                 {
                     Console.WriteLine(ex.Message);
                 }
                 System.Threading.Thread.Sleep(5000);
                 Console.WriteLine(i);
             }
        }

        private static void output()
        {
            FileStream fileStream = new FileStream("temp.json", FileMode.CreateNew);
            JsonTextWriter textWriter = new JsonTextWriter(new StreamWriter(fileStream));
            textWriter.WriteStartObject();
            textWriter.WritePropertyName("gauges");
            textWriter.WriteStartArray();

            for (int i = 0; i < gauges.Count; i++)
            {

                gauge tempGauge = gauges[i];
                textWriter.WriteStartObject();
                textWriter.WritePropertyName("url");
                textWriter.WriteValue(tempGauge.url);

                textWriter.WritePropertyName("date_scraped");
                textWriter.WriteValue(tempGauge.date_scraped);

                textWriter.WritePropertyName("River");
                textWriter.WriteValue(tempGauge.River);

                textWriter.WritePropertyName("station");
                textWriter.WriteValue(tempGauge.station);

                textWriter.WritePropertyName("Town");
                textWriter.WriteValue(tempGauge.Town);

                textWriter.WritePropertyName("GraphCode");
                textWriter.WriteValue(tempGauge.GraphCode);

                textWriter.WritePropertyName("loc");
                textWriter.WriteValue(tempGauge.loc);

                textWriter.WriteEndObject();
            }
            textWriter.Close();

            fileStream.Close();

        }

        private static void read()
        {
            string values;


            DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(gauge[]));
            DataContractJsonSerializer jsonSerializer = new DataContractJsonSerializer(typeof(gauge[]));

            Stream ms = new FileStream("c:\\users\\john\\documents\\visual studio 2012\\Projects\\JsonUpdater\\JsonUpdater\\environment-agency-river-levels.json", FileMode.Open);
            //gauge[] obj = JsonConvert.DeserializeObject<gauge[]>(ms);
            JsonTextReader jsonText = new JsonTextReader(new StreamReader(ms));
            string current = "";
            gauge Gauge = new gauge();
            while (jsonText.Read())
            {
                if (jsonText.TokenType == JsonToken.PropertyName)
                {
                    current = jsonText.Value.ToString();

                }
                else
                {


                    switch (current)
                    {
                        case "url":
                            {
                                Gauge = new gauge();
                                Gauge.url = jsonText.Value != null ? jsonText.Value.ToString() : null;
                                current = "";
                                break;
                            }
                        case "date_scraped":
                            {
                                Gauge.date_scraped = jsonText.Value != null ? jsonText.Value.ToString() : null;
                                current = "";

                                break;
                            }
                        case "River":
                            {
                                Gauge.River = jsonText.Value != null ? jsonText.Value.ToString() : null;
                                current = "";

                                break;
                            }
                        case "station":
                            {
                                Gauge.station = jsonText.Value != null ? jsonText.Value.ToString() : null;
                                current = "";

                                break;
                            }
                        case "Town":
                            {
                                Gauge.Town = jsonText.Value != null ? jsonText.Value.ToString() : null;
                                current = "";

                                break;
                            }
                        case "GraphCode":
                            {
                                Gauge.GraphCode = jsonText.Value != null ? jsonText.Value.ToString() : null;
                                current = "";

                                break;
                            }
                        case "loc":
                            {
                                Gauge.loc = jsonText.Value != null ? jsonText.Value.ToString() : null;
                                current = "";


                                gauges.Add(Gauge);
                                break;
                            }

                    }
                }
                Console.WriteLine("Token: {0}, Value: {1}", jsonText.TokenType, jsonText.Value);
            }
        }
    }

    class gauge
    {
        public string url, date_scraped, River, station, Town, GraphCode, loc;

    }
}
