import xml.dom.minidom as xml
from countries import get_country_code

class SvgPath:
    def __init__(self, d, id=None, name=None, classid=None):
        self.d = d
        self.code = id
        self.name = name
        self.classid = classid

        if self.classid is None:
            self.classid = self.name
        elif self.name is None:
            assert self.classid is not None
            self.name = self.classid
        else:
            pass    # both classid and name are set

        if self.code is None:
            cc = get_country_code(self.classid)
            if cc is not None:
                self.code = cc.upper()
            else:
                print(f"{self.name}: not found")

def class_count(classid, paths):
    return len([ cls for cls in paths if cls.classid == classid ])

if __name__ == '__main__':
    tree = xml.parse('world.xml')
    paths_xml = tree.getElementsByTagName('path')
    paths = []

    for p in paths_xml:
        attrs = dict(p.attributes.items())
        paths.append(SvgPath(**attrs))

