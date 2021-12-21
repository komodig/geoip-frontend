import xml.dom.minidom as xml
from countries import get_country_code

class SvgPath:
    def __init__(self, d, id=None, name=None, classid=None):
        self.d = d
        self.code = id
        self.name = name
        self.classid = classid
        self.id = None

        if self.classid is None:
            self.classid = self.name

        if self.code is None:
            cc = get_country_code(self.classid)
            if cc is not None:
                self.code = cc.upper()
            else:
                print(f"{self.classid}: not found")

def class_count(classid, paths):
    return len([cls for cls in paths if cls.classid == classid])

if __name__ == '__main__':
    tree = xml.parse('world.xml')
    paths_xml = tree.getElementsByTagName('path')
    paths = []

    for p in paths_xml:
        attrs = dict(p.attributes.items())
        paths.append(SvgPath(**attrs))

    unique_classes = sorted(set([svg.classid for svg in paths]))
    
    for cls in unique_classes:
        occ = class_count(cls, paths)

        cnt = 1
        for el in filter(lambda x: x.classid == cls, paths):
            if occ > 1:
                el.id = el.code + '_' + str(cnt) + '-' + str(occ) 
                cnt += 1
            else:
                el.id = el.code

    unique_ids = sorted(set([svg.id for svg in paths]))
    assert len(unique_ids) == len(paths)
