import React from 'react'
import {Sandpack, SandpackCodeEditor, SandpackLayout, SandpackProvider} from '@codesandbox/sandpack-react';
import Constants from '@/data/Constants';
import {aquaBlue} from '@codesandbox/sandpack-themes'

const CodeEditor = ({viewCode, isCompleted}:{viewCode:string, isCompleted:Boolean}) => {
  return (
    <div>
      {
        isCompleted ? 
        <Sandpack 
        template='react'
        theme={aquaBlue}
        options={{
          externalResources: ["https://cdn.tailwindcss"],
          showNavigator: true,
          showTabs: true,
          editorHeight: '80vh'
        }}
        customSetup={{
          dependencies: {
            ...Constants.DEPENDENCY
          }
        }}
        files={{
          "/App.js": `${viewCode}`,
        }}
      />

      :

      <SandpackProvider template="react"
        theme={aquaBlue}
        files={{
          '/app.js': {
            code: viewCode,
            active: true,
          }
        }}
        customSetup={{
          dependencies: {
            ...Constants.DEPENDENCY
          }
        }}
        options={{
          externalResources: ["https://cdn.tailwindcss"],
        }}
      >
        <SandpackLayout>
          <SandpackCodeEditor showTabs={true} style={{height:'80vh'}} />
        </SandpackLayout>
      </SandpackProvider>
      }
    </div>
  )
}

export default CodeEditor