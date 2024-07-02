import React, { useState, useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import LockIcon from "@mui/icons-material/Lock";
import { Highlight, themes } from "prism-react-renderer";
import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";

const CodeFile = ({ code, language = "jsx", picturePath }) => {
  const [copied, setCopied] = useState(false);
  const [formattedCode, setFormattedCode] = useState("");
  const locked = picturePath === "post3.jpeg" ? true : false;
  console.log("locked", locked);
  useEffect(() => {
    const formatCode = async () => {
      try {
        const formatted = await prettier.format(code, {
          parser: "babel",
          plugins: [parserBabel],
        });
        setFormattedCode(formatted);
      } catch (error) {
        console.error("Error formatting code:", error);
        setFormattedCode(code);
      }
    };
    formatCode();
  }, [code]);

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        mt: 2,
        mb: 1,
        maxHeight: "300px",
        overflow: "auto",
        position: "relative",
      }}
    >
      <Box p={2} bgcolor="#282a36" position="relative">
        <Highlight
          theme={themes.dracula}
          code={formattedCode}
          language={language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={className}
              style={{
                ...style,
                margin: 0,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                overflowWrap: "break-word",
              }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
        {!locked && (
          <Button
            variant="outlined"
            size="small"
            startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
            onClick={handleCopy}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "white",
              borderColor: "white",
              "&:hover": {
                borderColor: "white",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            {copied ? "Copied!" : "Copy"}
          </Button>
        )}
      </Box>
      {locked && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(5px)",
          }}
        >
          <LockIcon sx={{ fontSize: 60, color: "white", mb: 2 }} />
          <Button
            variant="contained"
            color="primary"
            startIcon={<LockIcon />}
            sx={{ mt: 2 }}
          >
            Buy Code
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default CodeFile;
